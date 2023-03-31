import React from 'react';
import logoImg from './epamLogo.jpg';
import classes from './Logo.module.css';

const Logo = () => {
	return (
		<div>
			<img className={classes.logo} src={logoImg} alt='logo_img Epam' />
		</div>
	);
};

export default Logo;
