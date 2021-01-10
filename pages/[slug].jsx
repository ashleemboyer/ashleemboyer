import Link from 'next/link';
import { getPostBySlug, getAllPostNames } from '../lib/api';
import { Layout } from '../components';
import styles from '../stylesheets/Pages.module.scss';
import { useLayoutEffect } from 'react';

const PostPage = ({ post }) => {
  const {
    meta: {
      title,
      description,
      image,
      formattedDate,
      timeToRead,
      tags,
      series_title,
      series_slug,
    },
    content,
    fileName,
  } = post;

  useLayoutEffect(() => {
    if (typeof ga !== 'undefined') {
      tags.forEach((tag) => {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Tags',
          eventAction: 'Post Landing',
          eventLabel: tag,
        });
      });
    }
  }, []);

  return (
    <Layout
      title={title}
      description={description}
      image={image}
      slug={fileName}
    >
      <div className={styles.PostPage}>
        <h1
          id="post-title"
          tabIndex="-1"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h1>
        {series_title && (
          <p>
            Part of the{' '}
            <Link href={`/series/${series_slug}`}>
              <a
                onClick={() => {
                  if (typeof ga !== 'undefined') {
                    ga('send', {
                      hitType: 'event',
                      eventCategory: 'Series',
                      eventAction: 'Series Click',
                      eventLabel: series_slug,
                    });
                  }
                }}
              >
                {series_title} Series
              </a>
            </Link>
          </p>
        )}
        <p>
          <span>
            {formattedDate} &mdash; {timeToRead}
          </span>
        </p>
        <div>
          {tags.map((tag) => (
            <Link href={`/tags/${tag}`} key={tag}>
              <a
                onClick={() => {
                  if (typeof ga !== 'undefined') {
                    ga('send', {
                      hitType: 'event',
                      eventCategory: 'Tags',
                      eventAction: 'Tag Click',
                      eventLabel: tag,
                    });
                  }
                }}
              >
                #{tag}
              </a>
            </Link>
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
      <button
        className={styles.ScrollButton}
        onClick={() => {
          window.scrollTo(0, 0);
          const title = document.getElementById('post-title');
          title.focus();
        }}
      >
        Scroll to top
      </button>
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
