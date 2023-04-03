import React, { useState } from 'react';
import { Button } from '../../../../common/Button/Button.jsx';
import Input from '../../../../common/Input/Input.jsx';
import classes from './SearchBar.module.css';

const SearchBar = ({ getFilterValue }) => {
	const [filter, setFilter] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		getFilterValue(filter);
	};

	const handleSeachChange = (e) => {
		setFilter(e.target.value);
		console.log(e.target.value);
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
};

export default SearchBar;
