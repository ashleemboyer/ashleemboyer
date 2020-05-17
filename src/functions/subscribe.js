const fetch = require('node-fetch');

exports.handler = async (event, context, callback) => {
  const API_URL = 'https://api.mailerlite.com/api/v2';

  const parsedBody = JSON.parse(event.body);
  const name = parsedBody.name;
  const email = parsedBody.email;
  const tags = parsedBody.tags;

  const existingSubscriber = await fetch(`${API_URL}/subscribers/${email}`, {
    method: 'GET',
    headers: {
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(result => result)
    .catch(err => console.error(err));

  if (existingSubscriber.email) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: false,
        message: `It looks like you've already subscribed with this email address: ${existingSubscriber.email}`,
      }),
    };
  }

  const newSubscriber = await fetch(
    `${API_URL}/groups/${process.env.MAILERLITE_NEEDS_TO_CONFIRM_GROUP_ID}/subscribers`,
    {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        type: 'unconfirmed',
        fields: {
          tags,
        },
      }),
      headers: {
        'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(response => response.json())
    .then(result => result)
    .catch(err => console.error(err));

  if (newSubscriber.email) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: `Check your inbox (${newSubscriber.email}) for a confirmation email.`,
      }),
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({
      success: false,
      message: 'There was a problem adding you to the system.',
    }),
  };
};
