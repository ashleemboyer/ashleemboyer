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

export async function getStaticProps() {
  let posts = getAllPosts();

  posts = posts.sort((a, b) => {
    if (a.meta.date < b.meta.date) {
      return 1;
    }

    return -1;
  });

  return { props: { posts: posts } };
}

export default HomePage;
