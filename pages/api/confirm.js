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

  const getSubscriberByEmailUrl = `${API_URL}/subscribers/${email}`;
  console.log(`Starting GET: ${getSubscriberByEmailUrl}`);
  const subscriber = await fetch(getSubscriberByEmailUrl, {
    method: 'GET',
    headers: {
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(data => {
      console.log(`Got subscriber: ${data}`);
      const subscriberId = getIdFromJSONString(data);
      const subscriberAsJSON = JSON.parse(data);
      subscriberAsJSON.id = subscriberId;
      return subscriberAsJSON;
    })
    .catch(err => console.error(err));

  if (!subscriber.email) {
    console.log('Subscriber not found in the system.');
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: false,
        message: `It doesn't look like anyone's signed up with this email address: ${email}.`,
      }),
    };
  }

  // remove from "Needs to Confirm" group
  const deleteFromGroupUrl = `${API_URL}/groups/${process.env.MAILERLITE_GROUP_ID_NEEDS_TO_CONFIRM}/subscribers/${subscriber.id}`;
  console.log(`Starting DELETE: ${deleteFromGroupUrl}`);
  const deleteResponse = await fetch(deleteFromGroupUrl, {
    method: 'DELETE',
    headers: {
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      let responseAsJSON = {
        status: response.status,
        statusText: response.statusText,
      };
      console.log(`DELETE response: ${JSON.stringify(responseAsJSON)}`);
      return responseAsJSON;
    })
    .catch(err => console.error(err));

  if (deleteResponse.status !== 204) {
    console.log(
      'Something went wrong with deleting the subscriber from the first group.'
    );
    return {
      statusCode: deleteResponse.status,
      body: JSON.stringify({
        success: false,
        message: deleteResponse.status,
      }),
    };
  }

  // add to "Newsletter" group
  const addToGroupUrl = `${API_URL}/groups/${process.env.MAILERLITE_GROUP_ID_NEWSLETTER}/subscribers`;
  console.log(`Starting POST: ${addToGroupUrl}`);
  await fetch(addToGroupUrl, {
    method: 'POST',
    body: JSON.stringify({ ...subscriber }),
    headers: {
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(data => {
      console.log(`Got subscriber: ${data}`);
      return JSON.parse(data);
    })
    .catch(err => console.error(err));

  console.log('Subscriber successfully confirmed.');
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: `Thanks for confirming your subscription, ${subscriber.name}! I hope you enjoy the newsletter.`,
    }),
  };
};
