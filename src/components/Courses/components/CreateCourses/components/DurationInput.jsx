import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../../common/Input/Input';
import convertTime from '../../../../../helpers/convertTime';

function DurationInput({ classes, durationDirty, durationError, duration, onBlurHandle, durationHandler }) {
  return (
    <div className={classes.createDuration}>
      <h3>Duration:</h3>
      <p>Duration</p>
      {durationDirty && durationError && (
        <div
          style={{
            color: 'red',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            fontSize: '12px',
          }}
        >
          {durationError}
        </div>
      )}
      <Input
        type='number'
        placeholderText='Enter duration in minutes...'
        value={duration}
        min='1'
        name='duration'
        onChange={(e) => durationHandler(e)}
        onBlur={(e) => onBlurHandle(e)}
      />
      <p className={classes.durationConvert}>Duration: {convertTime(duration)}</p>
    </div>
  );
}

DurationInput.propTypes = {
  classes: PropTypes.shape({
    createDuration: PropTypes.string,
    durationConvert: PropTypes.string,
  }).isRequired,
  durationDirty: PropTypes.bool.isRequired,
  durationError: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  onBlurHandle: PropTypes.func.isRequired,
  durationHandler: PropTypes.func.isRequired,
};

export default DurationInput;
