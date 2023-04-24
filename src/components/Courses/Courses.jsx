import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import classes from './Courses.module.css';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import Button from '../../common/Button/Button';

function Courses() {
  const [courses, setCourses] = useState(mockedCoursesList);
  const [authors, setAuthors] = useState(mockedAuthorsList);
  const [filter, setFilter] = useState('');
  const navigator = useNavigate();
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

  return (
    <div className={classes.mainCourses}>
      <div className={classes.mainSearchBar}>
        <SearchBar getFilterValue={getFilter} />
        <Button
          buttonText='Add new courses'
          type='button'
          onClick={() => {
            navigator('/courses/add');
          }}
          className={classes.buttonManipulation}
        />
      </div>
      <div className={classes.coursesCard}>
        <CourseCard coursesList={search(courses)} authorList={authors} />
      </div>
    </div>
  );
}

export default Courses;
