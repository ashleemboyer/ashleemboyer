import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { subscribe } from '../lib/subscribe';
import { Form, Layout } from '../components';

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

const Newsletter = (props) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submitForm = async () => {
    if (!name) {
      alert('Please enter a name in the form.');
      return;
    }

    if (!email) {
      alert('Please enter an email in the form.');
      return;
    }

    router.push({
      pathname: '/newsletter',
      query: {
        name: encodeURIComponent(name),
        email: encodeURIComponent(email),
      },
    });
  };

  const getPageContents = () => {
    if (props.error) {
      return <Error message={props.message} />;
    } else if (props.message) {
      return <Message message={props.message} />;
    } else {
      return (
        <>
          <h1>
            Did you know I have a newsletter?{' '}
            <span role="img" aria-label="Open mailbox with raised flag emoji.">
              📬
            </span>
          </h1>
          <p style={{ marginBottom: 32, lineHeight: '1.8rem' }}>
            If you want to get notified when I publish new blog posts or make
            major project announcements, this is the right place! All I need is
            your name and email address.
          </p>
          <Form>
            <h2 style={{ marginBottom: 32, fontSize: '1.8rem' }}>
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
              onChange={(e) => {
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
              onChange={(e) => {
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

  return <Layout title="Newsletter">{getPageContents()}</Layout>;
};

export async function getServerSideProps({ query }) {
  if (!query.name && !query.email) {
    return { props: {} };
  }

  const result = await subscribe(query.name, query.email)
    .then((data) => ({
      message: data.message,
      error: !data.success,
    }))
    .catch((err) => ({
      message: `There was an error in the request: ${err}.`,
      error: true,
    }));

  return {
    message: result.message || '',
    error: result.error || false,
  };
}

export default Newsletter;
