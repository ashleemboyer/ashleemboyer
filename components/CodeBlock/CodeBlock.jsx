import { Icon } from '../';
import styles from './CodeBlock.module.scss';

const CodeBlock = ({ language, lines, clipboardContent }) => (
  <div className={styles.CodeBlock}>
    <div className={styles['CodeBlock-toolbar']}>
      <span>{language}</span>
      <span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(clipboardContent.join('\n'));
          }}
        >
          <Icon name="clipboard" />
        </button>
      </span>
    </div>
    <div className={styles['CodeBlock-content']}>
      <div className={styles['CodeBlock-content-lineNumbers']}>
        {lines.map((_, index) => (
          <div>{index + 1}</div>
        ))}
      </div>
      <pre>
        {lines.map((thing) => (
          <div>{thing}</div>
        ))}
      </pre>
    </div>
  </div>
);

export default CodeBlock;
