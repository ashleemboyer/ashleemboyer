const Feed = require('feed').Feed;
import fs from 'fs';
import { getAllPosts } from '../lib/api';
import { Layout, PostList } from '../components';

const HomePage = ({ posts }) => (
  <Layout
    title="Ashlee M Boyer"
    description="You can find me writing about issues surrounding Disability, Accessibility, and Mental Health."
  >
    <PostList
      title="Journey of a Disabled Web Developer"
      subtitle={`She's written ${posts.length} posts.`}
      posts={posts}
    />
  </Layout>
);

const generateRSSFeed = (forRSSFeed) => {
  const baseUrl = 'https://ashleemboyer.com';
  const date = new Date();
  const author = {
    name: 'Ashlee Boyer',
    email: 'hello@ashleemboyer.com',
    link: 'https://twitter.com',
  };
  const feed = new Feed({
    title: 'Ashlee M Boyer',
    description:
      "You can find me talking about issues surrounding Disability, Accessibility, and Mental Health on Twitter, or you can find me regularly live-knitting or live-coding on Twitch. I'm @AshleeMBoyer on all the platforms I use.",
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
  });

  forRSSFeed.sort((a, b) => {
    if (a.meta.date < b.meta.date) {
      return 1;
    }

    return -1;
  });
  forRSSFeed.forEach((post) => {
    const {
      content,
      fileName,
      meta: { date, title },
    } = post;
    const url = `${baseUrl}/${fileName}`;

    feed.addItem({
      title,
      id: url,
      link: url,
      description: content,
      author: [author],
      contributor: [author],
      date: new Date(date),
    });
  });

  fs.writeFileSync('public/rss.xml', feed.rss2());
};

export async function getStaticProps() {
  let { forSite, forRSSFeed } = getAllPosts();

  generateRSSFeed(forRSSFeed);

  forSite.sort((a, b) => {
    if (a.meta.date < b.meta.date) {
      return 1;
    }

    return -1;
  });

  return { props: { posts: forSite } };
}

export default HomePage;
