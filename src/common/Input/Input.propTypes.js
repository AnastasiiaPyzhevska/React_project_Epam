import PropTypes from 'prop-types';

const InputPropTypes = {
  labelText: PropTypes.string,
  placeholderText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputPropTypes;
