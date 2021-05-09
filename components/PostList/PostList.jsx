import { useState } from 'react';
import Link from 'next/link';
import styles from './PostList.module.scss';

const filterBySearchValue = (posts, searchValue) => {
  const lowercased = searchValue.toLowerCase();
  if (!lowercased) {
    return posts;
  }

  return posts.filter((post) => {
    const {
      meta: { tags, title },
    } = post;

    const titleMatches = title.toLowerCase().indexOf(lowercased) !== -1;
    if (titleMatches) {
      return true;
    }

    const tagsMatch = tags.some(
      (tag) => tag.toLowerCase().indexOf(lowercased) !== -1,
    );
    if (tagsMatch) {
      return true;
    }

    return false;
  });
};

const PostList = ({ title, subtitle, posts }) => {
  const [searchValue, setSearchValue] = useState('');
  const filteredPosts = filterBySearchValue(posts, searchValue);
  const numberOfPosts = filteredPosts.length;

  return (
    <div className={styles.PostList}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <label htmlFor="post-search">Search by title or tags</label>
      <input
        id="post-search"
        onChange={(e) => setSearchValue(e.target.value)}
        type="search"
        value={searchValue}
      />
      {numberOfPosts > 0 ? (
        <div role="feed">
          {filteredPosts.map((post, index) => (
            <div
              key={post.fileName}
              id={post.fileName}
              role="article"
              aria-posinset={index + 1}
              tabIndex="0"
              aria-labelledby={`post-heading-${index + 1}`}
              aria-describedby={`post-description-${index + 1}`}
              aria-setsize={filteredPosts.length}
            >
              <h2
                id={`post-heading-${index + 1}`}
                dangerouslySetInnerHTML={{ __html: post.meta.title }}
              />
              <p
                id={`post-description-${index + 1}`}
                dangerouslySetInnerHTML={{ __html: post.meta.excerpt }}
              />
              <Link href={`/${post.fileName}`}>
                <a>Keep Reading</a>
              </Link>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>Sorry, no posts match that search value!</p>
      )}
    </div>
  );
};

export default PostList;
