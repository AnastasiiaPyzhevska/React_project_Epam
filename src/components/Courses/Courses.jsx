import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import { CourseCard } from './components/CourseCard/CourseCard.jsx';
import classes from './Courses.module.css';
import { mockedCoursesList, mockedAuthorsList } from '../../constants.js';
import { Button } from '../../common/Button/Button.jsx';
import CreateCourses from './components/CreateCourses/CreateCourses.jsx';

const Courses = ({ newCourses, newAuthors, isNewCourse }) => {
	const [courses, setCourses] = useState(newCourses || mockedCoursesList);
	const [authors, setAuthors] = useState(newAuthors || mockedAuthorsList);
	const [createPost, setCreatePost] = useState(isNewCourse || false);
	const [filter, setFilter] = useState('');

	const getFilter = (filt) => {
		setFilter(filt.toString().toLowerCase());
	};

	const search = (courses) => {
		return courses.filter((item) => item.title.toLowerCase().includes(filter) || item.id.toString().includes(filter));
	};

	useEffect(() => {
		setCourses(search(courses));
		setFilter(filter.toLowerCase());
	}, []);

	return createPost ? (
		<CreateCourses coursesList={courses} authorList={authors} isNewPost={createPost} />
	) : (
		<div className={classes.mainCourses}>
			<div className={classes.mainSearchBar}>
				<SearchBar getFilterValue={getFilter} />
				<Button
					buttonText='Add new courses'
					type='button'
					onClick={() => {
						setCreatePost(!createPost);
					}}
					className={classes.buttonManipulation}
				/>
			</div>
			<div className={classes.coursesCard}>
				<CourseCard coursesList={search(courses)} authorList={authors} />
			</div>
		</div>
	);
};

export default Courses;
