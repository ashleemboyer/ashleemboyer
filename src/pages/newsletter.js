import React, { useState } from "react";
import { navigate } from "gatsby";

import Layout from "../components/layout";
import { addSubscriber } from "../firebase";

const Newsletter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const labelStyles = {
    display: "block",
    fontFamily: "Lora",
    fontSize: "1.2rem",
    textAlign: "left",
  };

  const inputStyles = {
    width: "100%",
    maxWidth: "500px",
    padding: "4px",
    border: "1px solid grey",
    borderRadius: "4px",
  };

  return (
    <Layout>
      <div css={{ maxWidth: 700, margin: "0 auto" }}>
        <h1>Sign up for my newsletter!</h1>
        <p>
          You'll receive all of my posts straight to your inbox. If I have
          exciting news to share, such as upcoming talks or general life
          updates, you'll be the first to know! And I promise: no spam! Spammy
          newsletters suck.{" "}
          <span role="img" aria-label="smiling face with smiling eyes emoji">
            😊
          </span>
        </p>

        <p>Both fields are required.</p>

        <section
          css={{
            border: "1px solid #C2185B",
            padding: "24px",
            maxWidth: "400px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "32px",
            borderRadius: "4px",
          }}
        >
          <div css={{ margin: "16px 0" }}>
            <label css={labelStyles} htmlFor="name-field">
              Name
            </label>
            <input
              css={inputStyles}
              id="name-field"
              type="text"
              value={name}
              onChange={({ target: { value } }) => {
                setName(value);
              }}
            />
          </div>

          <div>
            <label css={labelStyles} htmlFor="email-field">
              Email
            </label>
            <input
              css={inputStyles}
              id="email-field"
              type="email"
              value={email}
              onChange={({ target: { value } }) => {
                setEmail(value);
              }}
            />
          </div>

          <button
            css={{
              marginTop: "32px",
              padding: "6px 12px",
              border: "1px solid #C2185B",
              borderRadius: "4px",
              color: "#FFFFFF",
              background: "#C2185B",
              cursor: "pointer",
              "&:hover": {
                fontWeight: "bold",
                "-webkit-box-shadow": "1px 1px 4px 0px rgba(194,24,91,0.6)",
                "-moz-box-shadow": "1px 1px 4px 0px rgba(194,24,91,0.6)",
                "box-shadow": "1px 1px 4px 0px rgba(194,24,91,0.6)",
              },
            }}
            onClick={() => {
              if (email.indexOf("a") === -1) {
                return;
              }

              addSubscriber({ name, email }).then(result => {
                if (result.success) {
                  alert("Subscribe successful! Expect an email soon.");
                  navigate("/");
                } else {
                  alert(`Could not subscribe. ${result.reason}`);
                }
              });
            }}
          >
            Sign Me Up!
          </button>
        </section>
      </div>
    </Layout>
  );
};

export default Newsletter;
