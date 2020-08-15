import React from 'react';

import styles from './Form.module.scss';

const Form = ({ children }) => (
  <form className={styles.Form}>
    <div>{children}</div>
  </form>
);

export default Form;
