import { useState } from 'react';
import { getAllPosts } from '../lib/api';
import Link from 'next/link';
import { Layout, PostListPagination } from '../components';

const PAGE_SIZE = 5;

const HomePage = ({ posts }) => {
  const postsCount = posts.length;
  const [currentPage, setCurrentPage] = useState(0);
  const numPages = Math.ceil(postsCount / PAGE_SIZE) - 1;
  const paginatedPosts = posts.slice(
    PAGE_SIZE * currentPage,
    PAGE_SIZE * currentPage + PAGE_SIZE
  );

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
      <div role="feed">
        {paginatedPosts.map((post, index) => (
          <div
            key={post.fileName}
            id={post.fileName}
            role="article"
            aria-posinset={index + 1}
            tabIndex="0"
            aria-labelledby={`post-heading-${index + 1}`}
            aria-describedby={`post-description-${index + 1}`}
            aria-setsize={PAGE_SIZE}
            onKeyDown={(e) => {
              let shouldPreventDefault = false;
              const focusableElements = document.querySelectorAll('a,button');

              if (e.keyCode === 33 && index > 0) {
                document
                  .getElementById(paginatedPosts[index - 1].fileName)
                  .focus();
                shouldPreventDefault = true;
              } else if (e.keyCode === 34 && index < PAGE_SIZE) {
                document
                  .getElementById(paginatedPosts[index + 1].fileName)
                  .focus();
                shouldPreventDefault = true;
              } else if (e.ctrlKey && e.keyCode === 36) {
                focusableElements[1].focus();
                shouldPreventDefault = true;
              } else if (e.ctrlKey && e.keyCode === 35) {
                !focusableElements[7].disabled
                  ? focusableElements[7].focus()
                  : focusableElements[8].focus();
                shouldPreventDefault = true;
              }

              if (shouldPreventDefault) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            <h2
              id={`post-heading-${index + 1}`}
              style={{ marginBottom: 12 }}
              dangerouslySetInnerHTML={{ __html: post.meta.title }}
            ></h2>
            <p
              id={`post-description-${index + 1}`}
              style={{ marginBottom: 12 }}
              dangerouslySetInnerHTML={{ __html: post.meta.excerpt }}
            ></p>
            <Link href={`/${post.fileName}`}>
              <a>Keep Reading</a>
            </Link>
            {index !== postsCount - 1 && <hr />}
          </div>
        ))}
      </div>
      <PostListPagination
        label={`${PAGE_SIZE * currentPage + 1} - ${
          PAGE_SIZE * currentPage + paginatedPosts.length
        } of ${postsCount}`}
        hasPrevious={currentPage > 0}
        onPrevious={() => {
          setCurrentPage(currentPage - 1);
          document.getElementById(paginatedPosts[0].fileName).focus();
        }}
        hasNext={currentPage < numPages}
        onNext={() => {
          setCurrentPage(currentPage + 1);
          document.getElementById(paginatedPosts[0].fileName).focus();
        }}
      />
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
