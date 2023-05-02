import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../../common/Input/Input';
import Button from '../../../../../common/Button/Button';

function TitleInput({ classes, titleDirty, titleError, title, onBlurHandle, titleHandler, handleCourse, courseID }) {
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
        {courseID && <Button buttonText='Update course' type='button' onClick={handleCourse} className={classes.buttonManipulation} />}
        {!courseID && <Button buttonText='Create course' type='button' onClick={handleCourse} className={classes.buttonManipulation} />}
      </div>
    </>
  );
}

TitleInput.propTypes = {
  classes: PropTypes.shape({
    header: PropTypes.string,
    createCoursesTitle: PropTypes.string,
    buttonManipulation: PropTypes.string,
  }).isRequired,
  titleDirty: PropTypes.bool.isRequired,
  titleError: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  courseID: PropTypes.string,
  onBlurHandle: PropTypes.func.isRequired,
  titleHandler: PropTypes.func.isRequired,
  handleCourse: PropTypes.func.isRequired,
};

TitleInput.defaultProps = {
  courseID: null,
};

export default TitleInput;
