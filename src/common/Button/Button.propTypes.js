import PropTypes from 'prop-types';

const ButtonPropTypes = {
  buttonText: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['submit', 'button']).isRequired,
  onClick: PropTypes.func,
};

export default ButtonPropTypes;
