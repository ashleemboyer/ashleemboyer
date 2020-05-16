const fetch = require('node-fetch');

exports.handler = async () => {
  const data = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Ashlee',
      email: 'ashleemboyer.dev@gmail.com',
      fields: {
        tags: 'gatsby,blogging,accessibility',
      },
    }),
    headers: {
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(result => result)
    .catch(err => console.error(err));

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
