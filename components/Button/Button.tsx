import { ButtonHTMLAttributes, createRef, FC, MouseEvent } from 'react';
import styles from './Button.module.scss';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const ref = createRef<HTMLButtonElement>();

  const { children, className, onClick } = props;
  const usableProps = {
    ...props,
    ref,
    className: `${styles.Button} ${className}`,
    onClick: onClick
      ? (event: MouseEvent<HTMLButtonElement>) => {
          onClick(event);
          ref.current!.blur();
        }
      : undefined,
  };

  delete usableProps.children;

  return <button {...usableProps}>{children}</button>;
};

export default Button;
