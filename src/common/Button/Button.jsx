import React from 'react';
import classes from './Button.module.css';

export const Button = ({ buttonText, type, onClick, ...rest }) => {
	return (
		<button
			className={classes.myButton}
			type={type}
			onClick={onClick}
			{...rest}
		>
			{buttonText}
		</button>
	);
};
