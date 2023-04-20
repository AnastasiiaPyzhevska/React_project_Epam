import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';

function Button({ buttonText, type, onClick, icon, ...rest }) {
  return (
    <button type={type} className={classes.myButton} onClick={onClick} {...rest}>
      {buttonText && <span className={classes.myButtonText}>{buttonText}</span>}
      {icon && (
        <span className={classes.iconButton}>
          <img src={icon} alt={buttonText} />
        </span>
      )}
    </button>
  );
}

Button.propTypes = {
  buttonText: PropTypes.string,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
  icon: '',
  buttonText: '',
};

export default Button;
