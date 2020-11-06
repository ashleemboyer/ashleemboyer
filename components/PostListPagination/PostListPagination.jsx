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
      Show Newer Posts
    </Button>
    <p>{label}</p>
    <Button disabled={!hasNext} onClick={onNext}>
      Show Older Posts
    </Button>
  </div>
);

export default PostListPagination;
