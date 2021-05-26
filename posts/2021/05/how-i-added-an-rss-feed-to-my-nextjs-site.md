---
title: How I Added an RSS Feed to My Next.js Site
date: 2021-05-27
description: Learn how to add an RSS feed to your own Next.js site.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F05%2Fhow-i-added-an-rss-feed-to-my-nextjs-site%2FHowIAddedAnRSSFeedToMyNextJSSite.png?alt=media&token=4442df96-b2f4-4dcb-8dc8-02da99da9522
tags: [rss, react, nextjs, web-development]
---

I recently came across [a tweet from Sara Soueidan](https://twitter.com/SaraSoueidan/status/1390598514774847496) applauding folks who provide an RSS feed on their site. Sara is someone I highly admire in frontend web development and accessibility, but I had so little knowledge of RSS feeds and so many questions:

- What the heck are they?
- What are they for?
- I thought people didn't use them anymore?

If you also have questions like this, I recommend reading [How Do RSS Feeds Work?](https://rss.com/blog/how-do-rss-feeds-work/) right from RSS.com. The first few words really sum it up:

> Imagine being able to log into one dashboard and getting the latest news and events from all of your favorite websites, blogs, or podcasts? With RSS feeds, it’s possible!

To better understand how RSS feeds are consumed, I created my own RSS reader app and I also [wrote about it](https://ashleemboyer.com/create-your-own-nextjs-rss-reader-app) so you can create one too if you like. The app I created also served as a great way for me to test my RSS feed as I built it!

## How I Added an RSS Feed to my Next.js Site

There were two main problems I ran into while trying to build an RSS feed for my articles. Firstly, I didn't know that neither the `<description>` nor `content` of each `<item>` in the channel can't have regular HTML in it. [The HTML tags must be encoded](https://cyber.harvard.edu/rss/encodingDescriptions.html). Secondly, I found out it's really difficult to try to parse the HTML content in a Node.js environment on my own before putting it into the feed.

After struggling for hours and trying several different approaches, I [went to Twitter for help](https://twitter.com/AshleeMBoyer/status/1391568723581054978). There were a lot of helpful replies! I found exactly what I ended up using thanks to [an example project](https://github.com/sweeneyapps/html2rssfeed) from [@vphreak](https://twitter.com/vphreak/status/1391853784666501121). So, what did it take?

First, I installed [the `feed` package](https://github.com/jpmonette/feed).

```bash
yarn add feed
```

Then, I added a `generateRSSFeed` function.

```js
const generateRSSFeed = (articles) => {
  const baseUrl = 'https://ashleemboyer.com';
  const author = {
    name: 'Ashlee Boyer',
    email: 'hello@ashleemboyer.com',
    link: 'https://twitter.com/ashleemboyer',
  };

  // Construct a new Feed object
  const feed = new Feed({
    title: 'Articles by Ashlee M Boyer',
    description:
      "You can find me talking about issues surrounding Disability, Accessibility, and Mental Health on Twitter, or you can find me regularly live-knitting or live-coding on Twitch. I'm @AshleeMBoyer on all the platforms I use.",
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
  });

  // Add each article to the feed
  articles.forEach((post) => {
    const {
      content,
      fileName,
      meta: { date, description, title },
    } = post;
    const url = `${baseUrl}/${fileName}`;

    feed.addItem({
      title,
      id: url,
      link: url,
      description,
      content,
      author: [author],
      date: new Date(date),
    });
  });

  // Write the RSS output to a public file, making it
  // accessible at ashleemboyer.com/rss.xml
  fs.writeFileSync('public/rss.xml', feed.rss2());
};
```

Finally, I updated the `getStaticProps` function exported from `src/pages/index.jsx` to call the new `generateRSSFeed` function.

```js
export async function getStaticProps() {
  const articles = getAllArticles();
  articles.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1)

  generateRSSFeed(articles);

  return { props: { articles } };
}
```

Because my site is set up to build only when my main git branch is updated, `getStaticProps` will be called at that time and so will `generateRSSFeed`. This means the feed is always up to date when I push a new Markdown file for each post or whenever existing files are updated.

## Resources

- [RSS 2.0 Specification](https://validator.w3.org/feed/docs/rss2.html)
- [`feed` GitHub repository](https://github.com/jpmonette/feed#readme)
- [W3Schools XML RSS page](https://www.w3schools.com/xml/xml_rss.asp)
