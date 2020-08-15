import Link from 'next/link';
import { getPostBySlug, getAllPostNames } from '../lib/api';
import { Layout } from '../components';
import styles from '../stylesheets/Pages.module.scss';

const PostPage = ({ post }) => {
  const {
    meta: { title, description, image, date, timeToRead, tags },
    content,
    fileName,
  } = post;

  return (
    <Layout
      title={title}
      description={description}
      image={image}
      slug={fileName}
    >
      <div className={styles.PostPage}>
        <h1>{title}</h1>
        <p>
          {date} &mdash; {timeToRead}
        </p>
        <div>
          {tags.map((tag) => (
            <Link href={`/tags/${tag}`} key={tag}>
              <a>#{tag}</a>
            </Link>
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  return { props: { post: getPostBySlug(params.slug) } };
}

export async function getStaticPaths() {
  const postNames = getAllPostNames();

  return {
    paths: postNames.map((postName) => ({
      params: {
        slug: postName,
      },
    })),
    fallback: false,
  };
}

export default PostPage;
