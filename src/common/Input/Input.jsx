import React from 'react';
import classes from './Input.module.css';

const Input = ({ labelText, placeholderText, type, onChange, ...rest }) => {
	return (
		<label htmlFor={labelText}>
			<input
				className={classes.myInput}
				type={type}
				placeholder={placeholderText}
				onChange={onChange}
				{...rest}
			/>
		</label>
	);
};

export default Input;
