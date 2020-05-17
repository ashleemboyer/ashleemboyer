const fetch = require('node-fetch');

exports.handler = async (event, context, callback) => {
  const API_URL = 'https://api.mailerlite.com/api/v2';

  const parsedBody = JSON.parse(event.body);
  const name = parsedBody.name;
  const email = parsedBody.email;
  const tags = parsedBody.tags;

  const getSubscriberByEmailUrl = `${API_URL}/subscribers/${email}`;
  console.log(`Starting GET: ${getSubscriberByEmailUrl}`);
  const existingSubscriber = await fetch(getSubscriberByEmailUrl, {
    method: 'GET',
    headers: {
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(data => {
      console.log(`Got subscriber: ${data}\n`);
      return JSON.parse(data);
    })
    .catch(err => console.error(err));

  if (existingSubscriber.email) {
    console.error('This subscriber is already in the system.');
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: false,
        message: `It looks like you've already subscribed with this email address: ${existingSubscriber.email}`,
      }),
    };
  }

  const postSubscriberUrl = `${API_URL}/groups/${process.env.MAILERLITE_GROUP_ID_NEEDS_TO_CONFIRM}/subscribers`;
  const postParams = {
    name: name,
    email: email,
    fields: {
      tags,
    },
  };
  console.log(`Starting POST: ${postSubscriberUrl}`);
  console.log(`  With params: ${JSON.stringify(postParams)}`);
  const newSubscriber = await fetch(postSubscriberUrl, {
    method: 'POST',
    body: JSON.stringify(postParams),
    headers: {
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(data => {
      console.log(`Got new subscriber: ${data}`);
      return JSON.parse(data);
    })
    .catch(err => console.error(err));

  if (newSubscriber.email) {
    console.log('Subscriber successfully added.');
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: `Check your inbox (${newSubscriber.email}) for a confirmation email.`,
      }),
    };
  }

  console.log('There was a problem adding the subscriber.');
  return {
    statusCode: 500,
    body: JSON.stringify({
      success: false,
      message: 'There was a problem adding you to the system.',
    }),
  };
};
