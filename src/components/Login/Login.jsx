import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import classes from './Login.module.css';

function Login({ setLoginUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (setLoginUser({ isAuth: false })) {
      navigate('/login');
    }
    if (localStorage.getItem('token')) {
      navigate('/courses');
    }
  }, []);

  const handleEmailChange = useCallback(
    (e) => {
      e.preventDefault();
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const handlePasswordChange = useCallback(
    (e) => {
      e.preventDefault();
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const enterence = async (user) => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      const success = result.successful;
      if (!success) {
        alert('Email or password are wrong, OR you are new User, please link to Registration');
      } else {
        navigate('/courses');
        setLoginUser({ isAuth: true, name: result.user.name, email: result.user.email, token: result.result });
        setEmail('');
        setPassword('');
        localStorage.setItem('token', result.result);
        localStorage.setItem('name', result.user.name);
        localStorage.setItem('isAuth', true);
      }
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  const createLogin = useCallback(
    (e) => {
      e.preventDefault();
      const user = {
        email,
        password,
      };
      enterence(user);
    },
    [email, password, enterence]
  );

  return (
    <div className={classes.block_Login}>
      <h1>Login</h1>
      <form onSubmit={createLogin}>
        <p>Email</p>
        <Input type='email' placeholderText='Enter email...' value={email} onChange={handleEmailChange} />
        <p>Password</p>
        <Input type='password' placeholderText='Enter password...' value={password} onChange={handlePasswordChange} />
        <Button buttonText='Login' type='submit' />
        <div className={classes.link_Registration}>
          If you have an account you can
          <Link to='/registration'> Registration </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
