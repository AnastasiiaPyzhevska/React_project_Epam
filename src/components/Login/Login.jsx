import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/user/actionCreators';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import classes from './Login.module.css';
import { loginRequest } from '../../servises';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/courses');
    } else {
      navigate('/login');
    }
  }, [navigate]);

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

  const enterence = useCallback(
    async (user) => {
      const response = await loginRequest(user);
      const success = response.successful;
      if (!success) {
        alert('Email or password are wrong, OR you are new User, please link to Registration');
      } else {
        navigate('/courses');
        dispatch(userLogin(response.user));
        setEmail('');
        setPassword('');
        const tokenUser = response.result;
        localStorage.setItem('token', tokenUser);
        localStorage.setItem('name', response.user.name);
        localStorage.setItem('isAuth', true);
        setToken(tokenUser);
        window.location.reload();
      }
    },
    [dispatch, setEmail, setPassword, navigate, setToken]
  );

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
