import React from 'react';

import styles from './Form.module.scss';

const Form = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit} className={styles.Form}>
    <div>{children}</div>
  </form>
);

export default Form;
