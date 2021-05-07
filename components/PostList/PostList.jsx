import Link from 'next/link';
import styles from './PostList.module.scss';

const PostList = ({ title, subtitle, posts }) => (
  <div className={styles.PostList}>
    <h1>{title}</h1>
    <p>{subtitle}</p>
    <div role="feed">
      {posts.map((post, index) => (
        <div
          key={post.fileName}
          id={post.fileName}
          role="article"
          aria-posinset={index + 1}
          tabIndex="0"
          aria-labelledby={`post-heading-${index + 1}`}
          aria-describedby={`post-description-${index + 1}`}
          aria-setsize={posts.length}
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
  </div>
);

export default PostList;
