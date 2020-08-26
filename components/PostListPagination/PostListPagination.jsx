import { Button } from '..';
import styles from './PostListPagination.module.scss';

const PostListPagination = ({
  label,
  hasPrevious,
  onPrevious,
  hasNext,
  onNext,
}) => (
  <div className={styles.PostListPagination}>
    <Button disabled={!hasPrevious} onClick={onPrevious}>
      Show Older Posts
    </Button>
    <p>{label}</p>
    <Button disabled={!hasNext} onClick={onNext}>
      Show Newer Posts
    </Button>
  </div>
);

export default PostListPagination;
