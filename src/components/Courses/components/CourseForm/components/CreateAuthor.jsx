import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../../common/Input/Input';
import Button from '../../../../../common/Button/Button';

function CreateAuthor({ classes, authorDirty, authorError, author, onBlurHandle, authorHandler, createNewAuthor }) {
  return (
    <div className={classes.createAuthor}>
      <h3>Add author:</h3>
      <p>Author name</p>
      {authorDirty && authorError && (
        <div
          style={{
            color: 'red',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            fontSize: '12px',
          }}
        >
          {authorError}
        </div>
      )}
      <div>
        <Input
          labelText='create_author'
          type='text'
          placeholderText='Enter author name...'
          value={author}
          name='author'
          onChange={(e) => authorHandler(e)}
          onBlur={(e) => onBlurHandle(e)}
        />
        <div className={classes.createAuthorButton}>
          <Button buttonText='Create author' type='button' onClick={createNewAuthor} />
        </div>
      </div>
    </div>
  );
}

CreateAuthor.propTypes = {
  classes: PropTypes.shape({
    createAuthor: PropTypes.string,
    createAuthorButton: PropTypes.string,
  }).isRequired,
  authorDirty: PropTypes.bool.isRequired,
  authorError: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onBlurHandle: PropTypes.func.isRequired,
  authorHandler: PropTypes.func.isRequired,
  createNewAuthor: PropTypes.func.isRequired,
};

export default CreateAuthor;
