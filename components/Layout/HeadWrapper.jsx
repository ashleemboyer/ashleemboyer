import Head from 'next/head';

const HeadWrapper = ({ title, description, image, slug }) => (
  <Head>
    <title>{title}</title>
    <script async src="https://www.google-analytics.com/analytics.js"></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
        ga('create', 'UA-129788768-1', 'auto');
        ga('send', 'pageview');`,
      }}
    ></script>

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

    {slug && (
      <meta property="og:url" content={`https://ashleemboyer.com/${slug}`} />
    )}
    {slug && <link rel="canonical" href={`https://ashleemboyer.com/${slug}`} />}
  </Head>
);

export default HeadWrapper;
