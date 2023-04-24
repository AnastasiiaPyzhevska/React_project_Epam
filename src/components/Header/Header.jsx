import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import classes from './Header.module.css';

function Header({ setLoginUser }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem('name');

  const logOutUser = useCallback(
    (e) => {
      e.preventDefault();
      navigate('/login');
      setLoginUser({ isAuth: false, name: '', email: '', token: '' });
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('isAuth');
    },
    [setLoginUser, navigate]
  );
  return (
    <div className={classes.header}>
      <Logo />
      <div className={classes.logOut}>
        <p className={classes.logOutName}>{userName}</p>
        <Button buttonText='LogOut' type='button' onClick={(e) => logOutUser(e)} />
      </div>
    </div>
  );
}

export default Header;
