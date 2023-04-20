import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import classes from './Courses.module.css';
import Button from '../../common/Button/Button';
import { getAuthors, getCourses } from '../../store/selectors';

function Courses() {
  const courses = useSelector(getCourses);
  const authors = useSelector(getAuthors);

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filter, setFilter] = useState('');
  const navigator = useNavigate();
  const createNewCourse = () => navigator('/courses/add');

  const getFilter = (filt) => {
    setFilter(filt.toString().toLowerCase());
  };

  useEffect(() => {
    const filtered = courses.filter((course) => course.title.toLowerCase().includes(filter));
    setFilteredCourses(filtered);
  }, [courses, filter]);

  return (
    <div className={classes.mainCourses}>
      <div className={classes.mainSearchBar}>
        <SearchBar getFilterValue={getFilter} />
        <Button buttonText='Add new courses' type='button' onClick={createNewCourse} className={classes.buttonManipulation} />
      </div>
      {filteredCourses.map((course) => {
        const authorsName = course.authors.map((id) => authors.find((author) => author.id === id));
        return (
          <div key={course.id} className={classes.coursesCard}>
            <CourseCard course={course} authorList={authorsName} />
          </div>
        );
      })}
    </div>
  );
}

export default Courses;
