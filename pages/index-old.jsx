import { Feed } from 'feed';
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

const generateRSSFeed = (articles) => {
  const baseUrl = 'https://ashleemboyer.com';
  const author = {
    name: 'Ashlee Boyer',
    email: 'hello@ashleemboyer.com',
    link: 'https://twitter.com/ashleemboyer',
  };
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

  articles.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
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

  fs.writeFileSync('public/rss.xml', feed.rss2());
};

const sortArticles = (a, b) => (a.meta.date < b.meta.date ? 1 : -1);

export async function getStaticProps() {
  let { forSite, forRSSFeed } = getAllPosts();
  forSite.sort(sortArticles);
  forRSSFeed.sort(sortArticles);

  generateRSSFeed(forRSSFeed);

  return { props: { posts: forSite } };
}

export default HomePage;
