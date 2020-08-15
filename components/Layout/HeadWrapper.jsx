import Head from 'next/head';

const HeadWrapper = ({ title, description, image, url }) => (
  <Head>
    <title>{title}</title>

    <meta charSet="utf-8" />
    <meta name="twitter:site" content="@ashleemboyer" />
    <meta name="twitter:creator" content="@ashleemboyer" />
    <meta name="twitter:card" content="summary_large_image" />

    {title && <meta name="title" content={title} />}
    {title && <meta property="og:title" content={title} />}
    {title && <meta name="twitter:title" content={title} />}

    {description && <meta name="description" content={description} />}
    {description && <meta property="og:description" content={description} />}
    {description && <meta name="twitter:description" content={description} />}

    {image && <meta name="image" content={image} />}
    {image && <meta property="og:image" content={image} />}
    {image && <meta name="twitter:image" content={image} />}

    {url && (
      <meta property="og:url" content={`https://ashleemboyer.com/${url}`} />
    )}
    {url && <link rel="canonical" href={`https://ashleemboyer.com/${url}`} />}
  </Head>
);

export default HeadWrapper;
