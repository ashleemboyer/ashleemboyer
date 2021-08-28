import { FC, InputHTMLAttributes } from 'react';
import { Icon } from '@components';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  label?: string;
}

const Input: FC<InputProps> = (props) => {
  const { icon, id, label } = props;
  const passableProps: InputProps = {
    ...props,
  };

  delete passableProps.label;

  return (
    <div className={styles.Input}>
      {label && <label htmlFor={id}>{label}</label>}
      {icon && <Icon name="search" />}
      <input {...props} />
    </div>
  );
};

export default Input;
