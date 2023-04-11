/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../../common/Input/Input';
import Button from '../../../../../common/Button/Button';

function TitleInput({ classes, titleDirty, titleError, title, onBlurHandle, titleHandler, createNewCource }) {
  return (
    <>
      <h3 className={classes.header}>Title </h3>
      {titleDirty && titleError && (
        <div
          style={{
            color: 'red',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            fontSize: '12px',
          }}
        >
          {titleError}
        </div>
      )}
      <div className={classes.createCoursesTitle}>
        <Input
          labelText='title'
          type='text'
          placeholderText='Enter title...'
          value={title}
          name='title'
          onBlur={(e) => onBlurHandle(e)}
          onChange={(e) => titleHandler(e)}
        />
        <Button buttonText='Create course' type='button' onClick={createNewCource} className={classes.buttonManipulation} />
      </div>
    </>
  );
}

TitleInput.propTypes = {
  classes: PropTypes.shape({
    header: PropTypes.object,
    createCoursesTitle: PropTypes.object,
    buttonManipulation: PropTypes.object,
  }).isRequired,
  titleDirty: PropTypes.bool.isRequired,
  titleError: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onBlurHandle: PropTypes.func.isRequired,
  titleHandler: PropTypes.func.isRequired,
  createNewCource: PropTypes.func.isRequired,
};

export default TitleInput;
