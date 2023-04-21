import React from 'react';
import PropTypes from 'prop-types';

function DescriptionInput({ classes, descriptionDirty, descriptionError, description, onBlurHandle, descriptionHandler }) {
  return (
    <>
      <h3 className={classes.header}>Description</h3>
      {descriptionDirty && descriptionError && (
        <div
          style={{
            color: 'red',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            fontSize: '12px',
          }}
        >
          {descriptionError}
        </div>
      )}
      <textarea
        placeholder='Enter description'
        className={classes.description}
        value={description}
        name='description'
        onChange={(e) => descriptionHandler(e)}
        onBlur={(e) => onBlurHandle(e)}
      />
    </>
  );
}

DescriptionInput.propTypes = {
  classes: PropTypes.shape({
    header: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  descriptionDirty: PropTypes.bool.isRequired,
  descriptionError: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onBlurHandle: PropTypes.func.isRequired,
  descriptionHandler: PropTypes.func.isRequired,
};

export default DescriptionInput;
