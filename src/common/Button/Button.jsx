import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';

function Button({ buttonText, type, onClick, ...rest }) {
  return (
    <button type={type} className={classes.myButton} onClick={onClick} {...rest}>
      {buttonText}
    </button>
  );
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
