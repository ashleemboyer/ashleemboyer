const fetch = require('node-fetch');

exports.handler = async (event, context, callback) => {
  const API_URL = 'https://api.mailerlite.com/api/v2';

  console.log(event.body);

  const parsedBody = JSON.parse(event.body);
  const email = parsedBody.email;

  const subscriber = await fetch(`${API_URL}/subscribers/${email}`, {
    method: 'PUT',
    body: JSON.stringify({
      type: 'active',
    }),
    headers: {
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => data)
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
  await fetch(
    `${API_URL}/groups/${process.env.MAILERLITE_NEEDS_TO_CONFIRM_GROUP_ID}/subscribers/${subscriber.email}`,
    {
      method: 'DELETE',
      headers: {
        'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
        'Content-Type': 'application/json',
      },
    }
  ).catch(err => console.error(err));

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
  ).catch(err => console.error(err));

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: `Thanks for confirming your subscription, ${subscriber.name}! I hope you enjoy the newsletter.`,
    }),
  };
};
