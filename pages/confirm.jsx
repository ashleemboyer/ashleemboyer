import React from 'react';
import { useRouter } from 'next/router';
import { confirm } from '../lib/confirm';
import { Layout } from '../components';

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

const Confirm = (props) => {
  const router = useRouter();
  if (!props.message && typeof window == 'object') {
    router.replace('/404');
  }

  const getPageContents = () => {
    if (props.error) {
      return <Error message={props.message} />;
    } else if (props.message) {
      return <Message message={props.message} />;
    }
  };

  return (
    <Layout title="Confirm Subscription">
      <div>{getPageContents()}</div>
    </Layout>
  );
};

Confirm.getInitialProps = async ({ query }) => {
  if (!query.email) {
    return { props: {} };
  }

  const result = await confirm(query.email)
    .then((data) => ({
      message: data.message,
      error: !data.success,
    }))
    .catch((err) => ({
      message: `There was an error in the request: ${err}.`,
      error: true,
    }));

  return {
    props: { message: result.message || '', error: result.error || false },
  };
};

export default Confirm;
