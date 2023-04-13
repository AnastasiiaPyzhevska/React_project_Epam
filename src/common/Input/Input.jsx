import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.module.css';

function Input({ labelText, placeholderText, type, onChange, ...rest }) {
  return (
    <label htmlFor={labelText}>
      <input className={classes.myInput} type={type} placeholder={placeholderText} onChange={onChange} {...rest} />
    </label>
  );
}

Input.propTypes = {
  labelText: PropTypes.string,
  placeholderText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  labelText: '',
};

export default Input;
