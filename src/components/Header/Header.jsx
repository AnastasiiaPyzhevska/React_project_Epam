import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import classes from './Header.module.css';
import { getUserAuth, getUserName } from '../../store/selectors';
import { userLogout } from '../../store/user/actionCreators';
import { fetchLogoutUser } from '../../store/user/thunk';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector(getUserName);
  const userAuth = useSelector(getUserAuth);

  const logOutUser = async () => {
    await dispatch(fetchLogoutUser());
    navigate('/login');
  };

  return (
    <div className={classes.header}>
      <Logo />
      {userAuth && (
        <div className={classes.logOut}>
          <p className={classes.logOutName}>{userName || 'admin'}</p>
          <Button buttonText='LogOut' type='button' onClick={logOutUser} />
        </div>
      )}
    </div>
  );
}

export default Header;
