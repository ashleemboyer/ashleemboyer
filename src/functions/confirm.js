const fetch = require('node-fetch');

const getIdFromJSONString = jsonString => {
  const searchString = `"id":`;
  const indexOfSearchString = jsonString.indexOf(searchString);
  const shortenedJSONString = jsonString.substring(
    indexOfSearchString + searchString.length
  );
  const indexOfComma = shortenedJSONString.indexOf(',');
  const id = shortenedJSONString.substring(0, indexOfComma);

  return id;
};

exports.handler = async (event, context, callback) => {
  const API_URL = 'https://api.mailerlite.com/api/v2';

  const parsedBody = JSON.parse(event.body);
  const email = parsedBody.email;

  const subscriber = await fetch(`${API_URL}/subscribers/${email}`, {
    method: 'GET',
    headers: {
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(data => {
      const subscriberId = getIdFromJSONString(data);
      const subscriberAsJSON = JSON.parse(data);
      subscriberAsJSON.id = subscriberId;
      return subscriberAsJSON;
    })
    .catch(err => console.error(err));

  if (!subscriber.email) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: false,
        message: `It doesn't look like anyone's signed up with this email address: ${email}.`,
      }),
    };
  }

  // remove from "Needs to Confirm" group
  const deleteResponse = await fetch(
    `${API_URL}/groups/${process.env.MAILERLITE_NEEDS_TO_CONFIRM_GROUP_ID}/subscribers/${subscriber.id}`,
    {
      method: 'DELETE',
      headers: {
        'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(response => ({
      status: response.status,
      statusText: response.statusText,
    }))
    .catch(err => console.error(err));

  if (deleteResponse.status !== 204) {
    return {
      statusCode: deleteResponse.status,
      body: JSON.stringify({
        success: false,
        message: deleteResponse.status,
      }),
    };
  }

  // add to "Newsletter" group
  await fetch(
    `${API_URL}/groups/${process.env.MAILERLITE_NEWSLETTER_GROUP_ID}/subscribers`,
    {
      method: 'POST',
      body: JSON.stringify({ ...subscriber }),
      headers: {
        'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err));

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: `Thanks for confirming your subscription, ${subscriber.name}! I hope you enjoy the newsletter.`,
    }),
  };
};
