import React from 'react';
import classes from './Input.module.css';
import InputPropTypes from './Input.propTypes';

function Input({ labelText, placeholderText, type, onChange, ...rest }) {
  return (
    <label htmlFor={labelText}>
      <input className={classes.myInput} type={type} placeholder={placeholderText} onChange={onChange} {...rest} />
    </label>
  );
}

Input.propTypes = InputPropTypes;
export default Input;
