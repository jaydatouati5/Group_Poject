import React from 'react';
import styles from './AuthForm.module.css';

const RegisterForm = ({
  setFirstName,
  setLastName,
  setBirthdate,
  setPhoneNumber,
  setAddress1,
  setAddress2,
  setEmail,
  setPassword,
  setConfirmPassword,
  firstName,
  lastName,
  birthdate,
  phoneNumber,
  address1,
  address2,
  email,
  password,
  confirmPassword,
  errors,
}) => {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.column}>
          <label htmlFor="firstName" className={styles.label}>
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={styles.input}
          />
          {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
        </div>
        <div className={styles.column}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className={styles.input}
          />
          {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.column}>
          <label htmlFor="birthdate" className={styles.label}>
            Birthdate:
          </label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
            className={styles.input}
          />
          {errors.birthdate && <p className={styles.error}>{errors.birthdate}</p>}
        </div>
        <div className={styles.column}>
          <label htmlFor="phoneNumber" className={styles.label}>
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className={styles.input}
          />
          {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber}</p>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.column}>
          <label htmlFor="address1" className={styles.label}>
            Address 1:
          </label>
          <input
            type="text"
            id="address1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required
            className={styles.input}
          />
          {errors.address1 && <p className={styles.error}>{errors.address1}</p>}
        </div>
        <div className={styles.column}>
          <label htmlFor="address2" className={styles.label}>
            Address 2:
          </label>
          <input
            type="text"
            id="address2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            className={styles.input}
          />
          {errors.address2 && <p className={styles.error}>{errors.address2}</p>}
        </div>
      </div>

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

      <div className={styles.row}>
        <div className={styles.column}>
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
        </div>
        <div className={styles.column}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
