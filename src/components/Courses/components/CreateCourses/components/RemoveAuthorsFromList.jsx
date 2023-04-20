import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../common/Button/Button';

function RemoveAuthorsFromList({ classes, selectedAuthors, removeAuthorFromList }) {
  return (
    <div className={classes.authorAddSet}>
      <h3>Course authors</h3>
      {selectedAuthors.length > 0 ? (
        <ul>
          {selectedAuthors.map((authAdd) => (
            <div key={authAdd.id} className={classes.authorItems}>
              <li>{authAdd.name}</li>
              <Button buttonText='Remove author' type='button' onClick={(e) => removeAuthorFromList(authAdd, e)} />
            </div>
          ))}
        </ul>
      ) : (
        <p>Author list is empty</p>
      )}
    </div>
  );
}

RemoveAuthorsFromList.propTypes = {
  selectedAuthors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeAuthorFromList: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    authorAddSet: PropTypes.string,
    authorItems: PropTypes.string,
  }).isRequired,
};

export default RemoveAuthorsFromList;
