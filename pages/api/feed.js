import { getAllPosts } from '../../lib/api';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/rss+xml');

  try {
    const posts = await getAllPosts({ forRSSFeed: true });
    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
      <channel>
        <title>Ashlee M Boyer</title>
        <link>https://ashleemboyer.com</link>
        <description>You can find me talking about issues surrounding Disability, Accessibility, and Mental Health on Twitter, or you can find me regularly live-knitting or live-coding on Twitch. I'm @AshleeMBoyer on all the platforms I use.</description>
        ${posts
          .map((post) => {
            const {
              content,
              fileName,
              meta: { date, title },
            } = post;

            if (fileName === 'yes-you-should-have-hobbies-outside-of-code') {
              console.log(content);
            }

            return `<item>
            <title>${title}</title>
            <link>https://ashleemboyer.com/${fileName}</link>
            <guid>https://ashleemboyer.com/${fileName}</guid>
            <pubDate>${date}</pubDate>
            <description>${content}</description>
          </item>`;
          })
          .join('')}
      </channel>
      </rss>
    `;

    res.write(feed);
    res.end();
  } catch (e) {
    console.log('ERROR', e);
    res.statusCode = 500;
    res.end();
  }
}
