import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import classes from './Courses.module.css';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import Button from '../../common/Button/Button';

function Courses({ setIsNewCourse }) {
  const [courses, setCourses] = useState(mockedCoursesList);
  const [authors, setAuthors] = useState(mockedAuthorsList);
  const [filter, setFilter] = useState('');
  const search = (cours) => cours.filter((item) => item.title.toLowerCase().includes(filter) || item.id.toString().includes(filter));

  useEffect(() => {
    if (filter) {
      setCourses(search(courses));
    } else {
      setCourses(mockedCoursesList);
    }
    setAuthors(authors);
  }, [filter]);

  const getFilter = (filt) => {
    setFilter(filt.toString().toLowerCase());
  };

  function createNewCourse() {
    setIsNewCourse(true);
  }
  const handleCreateNewCourse = useCallback(() => {
    createNewCourse();
  }, [createNewCourse]);

  return (
    <div className={classes.mainCourses}>
      <div className={classes.mainSearchBar}>
        <SearchBar getFilterValue={getFilter} />
        <Button buttonText='Add new courses' type='button' onClick={handleCreateNewCourse} className={classes.buttonManipulation} />
      </div>
      <div className={classes.coursesCard}>
        <CourseCard coursesList={search(courses)} authorList={authors} />
      </div>
    </div>
  );
}

Courses.propTypes = {
  setIsNewCourse: PropTypes.func,
};

Courses.defaultProps = {
  setIsNewCourse: false,
};

export default Courses;
