import React, { useState, useEffect } from 'react';
import qs from 'querystring';

import Layout from '../components/Layout/Layout';

const confirmSubscriber = async email => {
  return await fetch('/.netlify/functions/confirm', {
    method: 'PUT',
    body: JSON.stringify({
      email,
    }),
  })
    .then(response => response.json())
    .then(data => data);
};

const Loading = () => {
  return <h1>Loading...</h1>;
};

const Message = ({ message }) => {
  return (
    <>
      <h1>
        You're confirmed!{' '}
        <span role="img" aria-label="Party popper emoji.">
          🎉
        </span>
      </h1>
      <p>{message}</p>
    </>
  );
};

const Error = ({ message }) => {
  return (
    <>
      <h1>There might be a problem.</h1>
      <p>{message}</p>
      <p>
        <a href="mailto:hello@ashleemboyer.com">Send Ashlee an email</a> and she
        can probably help you out.
      </p>
    </>
  );
};

const Confirm = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const params = qs.parse(location.search.substring(1));
    const email = params.email;
    if (!email) {
      window.location = '/404';
    }

    confirmSubscriber(email)
      .then(data => {
        setLoading(false);
        setMessage(data.message);

        if (!data.success) {
          setShowError(true);
        }
      })
      .catch(err => {
        setLoading(false);
        setMessage(`There was an error in the request: ${err}.`);
        setShowError(true);
        console.error(err);
      });
  }, [location]);

  const getPageContents = () => {
    if (loading) {
      return <Loading />;
    } else if (showError) {
      return <Error message={message} />;
    } else if (message) {
      return <Message message={message} />;
    }
  };

  return (
    <Layout>
      <div>{getPageContents()}</div>
    </Layout>
  );
};

export default Confirm;
