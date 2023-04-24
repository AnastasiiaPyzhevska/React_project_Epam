import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import classes from './Header.module.css';
import { getUserName } from '../../store/selectors';
import { userLogout } from '../../store/user/actionCreators';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector(getUserName);

  const logOutUser = useCallback(
    (e) => {
      e.preventDefault();
      navigate('/login');
      dispatch(userLogout());
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('isAuth');
      window.location.reload();
    },
    [navigate]
  );

  return (
    <div className={classes.header}>
      <Logo />
      <div className={classes.logOut}>
        <p className={classes.logOutName}>{userName}</p>
        <Button buttonText='LogOut' type='button' onClick={logOutUser} />
      </div>
    </div>
  );
}

export default Header;
