import styles from './CodeBlock.module.scss';

const CodeBlock = ({ lines, clipboardContent }) => (
  <div className={styles.CodeBlock}>
    <button
      onClick={() => {
        navigator.clipboard.writeText(clipboardContent.join('\n'));
      }}
    >
      copy
    </button>
    <div>
      {lines.map((_, index) => (
        <div className="line-number">{index + 1}</div>
      ))}
    </div>
    <pre>
      {lines.slice(0, lines.length - 1).map((thing) => (
        <div className="line-of-code">{thing}</div>
      ))}
    </pre>
  </div>
);

export default CodeBlock;
