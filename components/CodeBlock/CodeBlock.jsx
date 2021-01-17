import { useState } from 'react';
import { Icon } from '../';
import styles from './CodeBlock.module.scss';

const CodeBlock = ({ language, lines, clipboardContent }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className={styles.CodeBlock}>
      <div className={styles['CodeBlock-toolbar']}>
        <span>{language}</span>
        <span>
          <button
            onClick={() => {
              if (!copied) {
                navigator.clipboard.writeText(clipboardContent.join('\n'));
                setCopied(true);

                setTimeout(() => {
                  setCopied(false);
                }, 5000);
              }
            }}
          >
            <Icon name={copied ? 'clipboard-check' : 'clipboard'} />
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
          {lines.map((line) => (
            <div>{line}</div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
