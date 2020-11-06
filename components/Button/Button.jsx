import styles from './Button.module.scss';

const Button = (props) => {
  const ref = React.createRef();

  const usableProps = {
    ...props,
    ref,
    className: `${styles.Button} ${props.className}`,
    onClick: () => {
      props.onClick();
      ref.current.blur();
    },
  };
  delete usableProps.children;

  return <button {...usableProps}>{props.children}</button>;
};

export default Button;
