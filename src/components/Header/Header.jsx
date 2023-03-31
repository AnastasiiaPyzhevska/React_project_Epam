import React from 'react';
import { Button } from '../../common/Button/Button.jsx';
import Logo from './components/Logo/Logo.jsx';
import classes from './Header.module.css';

const Header = () => {
	return (
		<div className={classes.header}>
			<Logo />
			<div className={classes.logOut}>
				<p className={classes.logOutName}>Nastya</p>
				<Button buttonText='LogOut' type='button' />
			</div>
		</div>
	);
};

export default Header;
