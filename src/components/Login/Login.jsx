import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import classes from './Login.module.css';
import { fetchLoginUser } from '../../store/user/thunk';
import { getUserAuth } from '../../store/selectors';

function Login() {
  const location = useLocation();
  const { from, email: emailDefault = '', name, password: passwordDefault = '' } = location.state || {};
  const [formData, setFormData] = useState({ email: emailDefault, password: passwordDefault });
  const userAuth = useSelector(getUserAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEffect to courses');
    if (userAuth) {
      navigate('/courses');
    } else {
      navigate('/login');
    }
  }, [userAuth]);

  const handleEmailChange = useCallback(
    (event) => {
      setFormData({ ...formData, email: event.target.value });
    },
    [formData]
  );

  const handlePasswordChange = useCallback(
    (event) => {
      setFormData({ ...formData, password: event.target.value });
    },
    [formData]
  );

  const enterence = async (user) => {
    dispatch(fetchLoginUser(user));
    setFormData({ email: '', password: '' });
  };

  const createLogin = useCallback(
    (event) => {
      event.preventDefault();
      enterence(formData);
    },
    [formData]
  );

  return (
    <div className={classes.block_Login}>
      <h1>Login</h1>
      <form onSubmit={createLogin}>
        <p>Email</p>
        <Input type='email' email='email' placeholderText='Enter email...' value={formData.email} onChange={handleEmailChange} />
        <p>Password</p>
        <Input type='password' password='password' placeholderText='Enter password...' value={formData.password} onChange={handlePasswordChange} />
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
