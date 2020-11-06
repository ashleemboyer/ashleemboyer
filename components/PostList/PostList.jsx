import { useState, useLayoutEffect } from 'react';
import Link from 'next/link';
import { PostListPagination } from '../PostListPagination';
import styles from './PostList.module.scss';

const PAGE_SIZE = 5;

const PostList = ({ title, subtitle, posts }) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const postsCount = posts.length;
  const numPages = Math.ceil(postsCount / PAGE_SIZE) - 1;
  const paginatedPosts = posts.slice(
    PAGE_SIZE * currentPage,
    PAGE_SIZE * currentPage + PAGE_SIZE,
  );

  useLayoutEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    document.querySelectorAll('[role="article"]')[0].focus();
  }, [currentPage]);

  return (
    <div className={styles.PostList}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {posts.map((post) => (
        <h2>{post.title}</h2>
      ))}
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
              dangerouslySetInnerHTML={{ __html: post.meta.title }}
            ></h2>
            <p
              id={`post-description-${index + 1}`}
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
        }}
        hasNext={currentPage < numPages}
        onNext={() => {
          setCurrentPage(currentPage + 1);
        }}
      />
    </div>
  );
};

export default PostList;
