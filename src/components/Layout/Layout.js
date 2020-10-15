import React from 'react';
import { useStaticQuery, Link, graphql, withPrefix } from 'gatsby';
import { Helmet } from 'react-helmet';

import styles from './Layout.module.scss';

export default ({ children, title, description, image, url }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const bigTitle = title
    ? `${data.site.siteMetadata.title} | ${title}`
    : data.site.siteMetadata.title;

  return (
    <div className={styles.Layout}>
      <Helmet title={bigTitle}>
        <meta charSet="utf-8" />
        <meta name="twitter:site" content="@ashleemboyer" />
        <meta name="twitter:creator" content="@ashleemboyer" />
        <meta name="twitter:card" content="summary_large_image" />

        {title && <meta name="title" content={title} />}
        {title && <meta property="og:title" content={title} />}
        {title && <meta name="twitter:title" content={title} />}

        {description && <meta name="description" content={description} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {description && (
          <meta name="twitter:description" content={description} />
        )}

        {image && <meta name="image" content={image} />}
        {image && <meta property="og:image" content={image} />}
        {image && <meta name="twitter:image" content={image} />}

        {url && (
          <meta property="og:url" content={`https://ashleemboyer.com/${url}`} />
        )}
        {url && (
          <link rel="canonical" href={`https://ashleemboyer.com/${url}`} />
        )}

        <script
          src={withPrefix('mailerlite.js')}
          type="text/javascript"
        ></script>
      </Helmet>
      <header>
        <img
          src="/me.jpg"
          alt="Ashlee standing in front of a brick wall looking up to her left and smiling. Her right hand is held up near her right shoulder with the palm facing upwards."
        />
        <div>
          <Link to={`/`}>
            <h2>{data.site.siteMetadata.title}</h2>
          </Link>
          <p>
            You can find me talking about issues surrounding Disability,
            Accessibililty, & Mental Health on{' '}
            <a href="https://twitter.com/ashleemboyer" target="_blank" rel="noreferrer">Twitter</a>, or you can
            find me regularly live-knitting or live-coding on{' '}
            <a href="https://twitch.tv/ashleemboyer" target="_blank" rel="noreferrer">Twitch</a>. You can also <a href="https://forms.gle/Q79Dr7bkFnYV3y759" target="_blank" rel="noreferrer">contact me</a> if you're in need of a freelance web developer.
          </p>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
