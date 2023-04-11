import React from 'react';
import ButtonPropTypes from './Button.propTypes';
import classes from './Button.module.css';

function Button({ buttonText, type, onClick, ...rest }) {
  return (
    <button type={type === 'submit' ? 'submit' : 'button'} className={classes.myButton} onClick={onClick} {...rest}>
      {buttonText}
    </button>
  );
}

Button.propTypes = ButtonPropTypes;
export default Button;
