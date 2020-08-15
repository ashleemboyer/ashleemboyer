import { getAllPosts } from '../lib/api';
import Link from 'next/link';

import { Layout } from '../components';

const HomePage = ({ posts }) => {
  const postsCount = posts.length;

  return (
    <Layout
      title="Ashlee M Boyer"
      description="You can find me writing about issues surrounding Disability, Accessibility, and Mental Health."
    >
      <h1 style={{ marginBottom: 20 }}>Journey of a Disabled Web Developer</h1>
      <p
        style={{
          marginBottom: 48,
          fontSize: '1.4rem',
          fontFamily: 'Lora',
          color: '#505050',
        }}
      >
        She's written {postsCount} posts.
      </p>
      {posts.map((post, index) => (
        <div key={post.fileName}>
          <h2
            style={{ marginBottom: 12 }}
            dangerouslySetInnerHTML={{ __html: post.meta.title }}
          ></h2>
          <p
            style={{ marginBottom: 12 }}
            dangerouslySetInnerHTML={{ __html: post.meta.excerpt }}
          ></p>
          <Link href={`/${post.fileName}`}>
            <a>Keep Reading</a>
          </Link>
          {index !== postsCount - 1 && <hr />}
        </div>
      ))}
    </Layout>
  );
};

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
