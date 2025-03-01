import React from 'react';
import styles from './AuthForm.module.css';

const LoginForm = ({ onSubmit, setEmail, setPassword, email, password, errors }) => {
  console.log(errors)
    return (
    <>
      <label htmlFor="email" className={styles.label}>
        Email:
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.input}
      />
      {errors.email && <p className={styles.error}>{errors.email}</p>}

      <label htmlFor="password" className={styles.label}>
        Password:
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.input}
      />
      {errors.password && <p className={styles.error}>{errors.password}</p>}
    </>
  );
};

export default LoginForm;
