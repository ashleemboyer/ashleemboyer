import Link from 'next/link';
import { getPostBySlug, getAllPostNames } from '../lib/api';
import { CodeBlock, Layout } from '../components';
import styles from '../stylesheets/Pages.module.scss';
import { useLayoutEffect } from 'react';

const getLanguage = (line) => {
  const searchString = 'class="language-';
  const indexOfClass = line.indexOf(searchString);
  if (indexOfClass === -1) {
    return undefined;
  }

  const firstSubstring = line.substring(indexOfClass + searchString.length);
  const indexOfQuote = firstSubstring.indexOf('"');
  const language = firstSubstring.substring(0, indexOfQuote);

  return language;
};

const renderContent = (content) => {
  const lines = content.split('\n');
  let currentListItems = [];
  let olStart = 1;

  return lines.map((line) => {
    let elementContent;

    if (line.startsWith('<pre')) {
      const codeLines = line.split('||');
      const language = getLanguage(codeLines[0]);

      const clipboardContent = [];
      const lines = [];
      codeLines.forEach((codeLine) => {
        if (codeLine.startsWith('<span class="line-of-code">')) {
          const innerStuff = codeLine.substring(
            '<span class="line-of-code">'.length,
            codeLine.length - '</span>'.length,
          );
          clipboardContent.push(innerStuff);
          lines.push(<span className="line-of-code">{innerStuff || ' '}</span>);
        }
      });

      return (
        <CodeBlock
          language={language}
          lines={lines.slice(0, lines.length - 1)}
          clipboardContent={clipboardContent}
        />
      );
    }

    if (line.startsWith('<p>')) {
      elementContent = line.substring(
        '<p>'.length,
        line.length - '</p>'.length,
      );
      return <p dangerouslySetInnerHTML={{ __html: elementContent }}></p>;
    }

    if (line.startsWith('<h2')) {
      const indexOfContent = line.indexOf('>');
      const h2Content = line.substring(
        indexOfContent + '>'.length,
        line.length - '</h2>'.length,
      );

      let id;
      const indexOfId = line.indexOf('id="');
      if (indexOfId !== -1) {
        id = line.substring(indexOfId + 'id="'.length, line.indexOf('">'));
      }

      return <h2 id={id} dangerouslySetInnerHTML={{ __html: h2Content }}></h2>;
    }

    if (line.startsWith('<h3')) {
      const indexOfContent = line.indexOf('>');
      const h3Content = line.substring(
        indexOfContent + '>'.length,
        line.length - '</h3>'.length,
      );

      return <h3 dangerouslySetInnerHTML={{ __html: h3Content }}></h3>;
    }

    if (line.startsWith('<ol') || line.startsWith('<ul')) {
      currentListItems = [];

      const indexOfStart = line.indexOf('start="');
      if (indexOfStart !== -1) {
        olStart = line.substring(
          indexOfStart + 'start="'.length,
          line.indexOf('">'),
        );
      } else {
        olStart = 1;
      }

      return;
    }

    if (line.startsWith('<li')) {
      currentListItems.push(
        <li
          dangerouslySetInnerHTML={{
            __html: line.substring('<li>'.length, line.length - '</li>'.length),
          }}
        ></li>,
      );
      return;
    }

    if (line === '</ol>') {
      return <ol start={olStart}>{currentListItems.map((item) => item)}</ol>;
    }

    if (line === '</ul>') {
      return <ul>{currentListItems.map((item) => item)}</ul>;
    }

    if (line === '<hr />') {
      return <hr />;
    }

    if (line.startsWith('<iframe')) {
      return <div dangerouslySetInnerHTML={{ __html: line }}></div>;
    }
  });
};

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
        <div>{renderContent(content)}</div>
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
