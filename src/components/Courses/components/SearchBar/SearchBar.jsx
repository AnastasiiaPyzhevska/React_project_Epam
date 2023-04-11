import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import classes from './SearchBar.module.css';

function SearchBar({ getFilterValue }) {
  const [filter, setFilter] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    getFilterValue(filter);
  };

  const handleSeachChange = (e) => {
    setFilter(e.target.value);
    if (e.target.value.length === 0) {
      getFilterValue('');
    }
  };

  return (
    <div className={classes.searchBar}>
      <Input labelText='search' type='text' placeholderText='Enter course name...' value={filter} onChange={handleSeachChange} />
      <Button buttonText='Search' type='button' onClick={handleSubmit} />
    </div>
  );
}

SearchBar.propTypes = {
  getFilterValue: PropTypes.func.isRequired,
};

export default SearchBar;
