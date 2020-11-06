const fetch = require('node-fetch');

export const subscribe = async (...subscribeArgs) => {
  const API_URL = 'https://api.mailerlite.com/api/v2';
  const name = decodeURIComponent(subscribeArgs[0] || '');
  const email = decodeURIComponent(subscribeArgs[1] || '');
  const tags = decodeURIComponent(subscribeArgs[2] || '');

  console.log(
    'needs to confirm group id:',
    process.env.NEXT_PUBLIC_MAILERLITE_GROUP_ID_NEEDS_TO_CONFIRM,
  );

  const getSubscriberByEmailUrl = `${API_URL}/subscribers/${email}`;
  console.log(`Starting GET: ${getSubscriberByEmailUrl}`);
  const existingSubscriber = await fetch(getSubscriberByEmailUrl, {
    method: 'GET',
    headers: {
      'X-MailerLite-ApiKey': process.env.NEXT_PUBLIC_MAILERLITE_API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(`Got subscriber: ${data}\n`);
      return JSON.parse(data);
    })
    .catch((err) => console.error(err));

  if (existingSubscriber && existingSubscriber.email) {
    return {
      statusCode: 200,
      success: false,
      message: `It looks like you've already subscribed with this email address: ${existingSubscriber.email}`,
    };
  }

  const postSubscriberUrl = `${API_URL}/groups/${process.env.NEXT_PUBLIC_MAILERLITE_GROUP_ID_NEEDS_TO_CONFIRM}/subscribers`;
  const postParams = {
    name,
    email,
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
      'X-MailerLite-ApiKey': process.env.NEXT_PUBLIC_MAILERLITE_API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then((data) => {
      const asJSON = JSON.parse(data);
      if (asJSON.error) {
        console.log(`Error adding new subscriber: ${asJSON.error.message}`);
        return {
          statusCode: asJSON.error.code,
          success: false,
          message: asJSON.error.message,
        };
      } else {
        console.log(`Got new subscriber: ${data}`);
        return JSON.parse(data);
      }
    })
    .catch((err) => console.error(err));

  if (newSubscriber && newSubscriber.email) {
    console.log('Subscriber successfully added.');
    return {
      statusCode: 200,
      success: true,
      message: `Check your inbox (${newSubscriber.email}) for a confirmation email.`,
    };
  }

  if (newSubscriber && !newSubscriber.success) {
    return { ...newSubscriber };
  }

  console.log('There was a problem adding the subscriber.');
  return {
    statusCode: 500,
    success: false,
    message: 'There was a problem adding you to the system.',
  };
};
