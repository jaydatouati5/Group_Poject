import React, { useState , useEffect } from 'react';
import axios from 'axios';
import styles from './AuthForm.module.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({isAuthenticated , setIsAuthenticated}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/checkAuth', { withCredentials: true });
        console.log(response.data);
        setIsAuthenticated(response.data.verified);
        if (response.data.verified) {
          navigate('/');
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const endpoint = '/login';
    const data = { email, password };

    try {
      const response = await axios.post('http://localhost:5000/api' + endpoint, data, { withCredentials: true });
      console.log(response.data);
      setErrors({}); // Clear errors on successful submission
      console.log('Login successful');
      navigate('/'); // Navigate to the root route upon successful login
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const endpoint = '/register';
    const data = {
      firstName,
      lastName,
      birthdate,
      phoneNumber,
      address1,
      address2,
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await axios.post('http://localhost:5000/api' + endpoint, data, { withCredentials: true });
      console.log(response.data);
      setErrors({}); // Clear errors on successful submission
    } catch (error) {
      console.error('Registration Error:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <>
      <h2 className={styles.title}>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit} className={`${styles.form} ${styles.registerForm}`}>
        {!isLogin ? (
          <RegisterForm
            setFirstName={setFirstName}
            setLastName={setLastName}
            setBirthdate={setBirthdate}
            setPhoneNumber={setPhoneNumber}
            setAddress1={setAddress1}
            setAddress2={setAddress2}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            firstName={firstName}
            lastName={lastName}
            birthdate={birthdate}
            phoneNumber={phoneNumber}
            address1={address1}
            address2={address2}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            errors={errors}
          />
        ) : (
          <LoginForm
            setEmail={setEmail}
            setPassword={setPassword}
            email={email}
            password={password}
            errors={errors}
          />
        )}

        <button type="submit" className={styles.button}>
          {isLogin ? 'Login' : 'Register'}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className={styles.switchButton}
        >
          Switch to {isLogin ? 'Register' : 'Login'}
        </button>
      </form>
    </>
  );
};

export default AuthForm;
