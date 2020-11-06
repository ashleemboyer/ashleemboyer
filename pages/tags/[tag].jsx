import { getAllTagNames, getPostsByTag } from '../../lib/api';
import { Layout } from '../../components';

const TagPage = ({ tag, posts }) => {
  return (
    <Layout title={`Posts under #${tag}`}>
      <h1>Hello!</h1>
    </Layout>
  );
};

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
