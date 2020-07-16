import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Form from '../components/Form/Form';

const Loading = () => {
  return <h1>Loading...</h1>;
};

const Message = ({ message }) => {
  return (
    <>
      <h1>
        You're in!{' '}
        <span role="img" aria-label="Party popper emoji.">
          🎉
        </span>
      </h1>
      <p>Thanks for signing up. {message}</p>
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

const Newsletter = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [showError, setShowError] = useState(false);

  const submitForm = async () => {
    setLoading(true);

    await fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
      }),
    })
      .then(response => response.json())
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
  };

  const getPageContents = () => {
    if (loading) {
      return <Loading />;
    } else if (showError) {
      return <Error message={message} />;
    } else if (message) {
      return <Message message={message} />;
    } else {
      return (
        <>
          <h1 css>
            Did you know I have a newsletter?{' '}
            <span role="img" aria-label="Open mailbox with raised flag emoji.">
              📬
            </span>
          </h1>
          <p css={{ marginBottom: 32, lineHeight: '1.8rem' }}>
            If you want to get notified when I publish new blog posts or make
            major project announcements, this is the right place! All I need is
            your name and email address.
          </p>
          <Form>
            <h2 css={{ marginBottom: 32, fontSize: '1.8rem' }}>
              Sign up here{' '}
              <span
                role="img"
                aria-label="Index finger pointing downward emoji."
              >
                👇
              </span>
            </h2>
            <label htmlFor="name">First name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={e => {
                e.preventDefault();
                setName(e.target.value);
              }}
            />
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={e => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
            />
            <button type="button" onClick={submitForm}>
              Subscribe
            </button>
          </Form>
        </>
      );
    }
  };

  return <Layout>{getPageContents()}</Layout>;
};

export default Newsletter;
