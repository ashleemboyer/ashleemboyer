import { getAllTagNames, getPostsByTag } from '../../lib/api';
import { Layout, PostList } from '../../components';

const TagPage = ({ tag, posts }) => (
  <Layout title={`Posts under #${tag}`}>
    <PostList
      title={`Posts with the "${tag}" tag`}
      subtitle={`She's written ${posts.length} posts`}
      posts={posts}
    />
  </Layout>
);

export async function getStaticProps({ params }) {
  return { props: { tag: params.tag, posts: getPostsByTag(params.tag) } };
}

export async function getStaticPaths() {
  const tagNames = getAllTagNames();

  return {
    paths: tagNames.map((tagName) => ({
      params: {
        tag: tagName,
      },
    })),
    fallback: false,
  };
}

export default TagPage;
