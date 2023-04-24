import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../common/Button/Button';

function AddAuthorsToList({ classes, authorsList, addAuthorFromList }) {
  return (
    <div className={classes.authorList}>
      <h3>Authors</h3>
      <ul>
        {authorsList.map((authShow) => (
          <div className={classes.authorItems}>
            <li key={authShow.id}>{authShow.name}</li>
            <Button buttonText='Add author' type='button' onClick={(e) => addAuthorFromList(authShow, e)} />
          </div>
        ))}
      </ul>
    </div>
  );
}

AddAuthorsToList.propTypes = {
  authorsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  addAuthorFromList: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    authorList: PropTypes.string,
    authorItems: PropTypes.string,
  }).isRequired,
};

export default AddAuthorsToList;
