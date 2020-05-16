import React, { useState } from 'react';

import Layout from '../components/layout';

const Loading = () => {
  return <h1>Loading...</h1>;
};

const Form = ({ name, setName, email, setEmail, submitForm }) => {
  return (
    <form onSubmit={submitForm}>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={e => {
          e.preventDefault();
          setName(e.target.value);
        }}
      />
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={e => {
          e.preventDefault();
          setEmail(e.target.value);
        }}
      />
      <button type="submit">Subscribe</button>
    </form>
  );
};

const Message = ({ message }) => {
  return (
    <>
      <h1>
        You're in!{' '}
        <span role="img" aria-label="party popper emoji">
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
        <Form
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          submitForm={submitForm}
        />
      );
    }
  };

  return (
    <Layout>
      <div css={{ maxWidth: 700, margin: '0 auto' }}>{getPageContents()}</div>
    </Layout>
  );
};

export default Newsletter;
