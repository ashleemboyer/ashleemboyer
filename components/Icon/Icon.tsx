import { FC } from 'react';
import classNames from 'classnames/bind';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Icon.module.scss';

interface IconProps {
  name: IconProp;
  small?: boolean;
  large?: boolean;
  spin?: boolean;
}

const Icon: FC<IconProps> = ({ name, small, large, spin }) => {
  let cx = classNames.bind(styles);
  let className = cx('Icon', {
    'Icon--small': small,
    'Icon--large': large,
  });

  return (
    <FontAwesomeIcon className={className} icon={name || 'smile'} spin={spin} />
  );
};

export default Icon;
