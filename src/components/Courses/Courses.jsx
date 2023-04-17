import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import classes from './Courses.module.css';
import Button from '../../common/Button/Button';
import { getAuthors, getCourses } from '../../store/selectors';
import { getAllCourses } from '../../store/courses/actionCreators';
import { getAllAUthors } from '../../store/authors/actionCreators';

function Courses() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const authors = useSelector((state) => state.authors.autors);
  const token = localStorage.getItem('token');
  console.log('courses & authors');
  console.log(courses);
  console.log(authors);
  const [coursesStatus, setCoursesStatus] = useState(true);
  const changeStatus = () => setCoursesStatus(false);
  // const authors = useSelector(getAuthors);
  const [filter, setFilter] = useState('');
  const navigator = useNavigate();
  const createNewCourse = () => navigator('/courses/add');
  const getFilter = (filt) => {
    setFilter(filt.toString().toLowerCase());
  };

  // const coursesReguest = async () => {
  //   try {
  //     const response = await fetch('http://localhost:4000/courses/all');
  //     const result = await response.json();
  //     const success = result.successful;
  //     console.log(result.result);
  //     if (!success) {
  //       alert('Something wrong...');
  //     } else {
  //       dispatch(getAllCourses(result.result));
  //     }
  //   } catch (e) {
  //     alert(e);
  //     console.log(e);
  //   }
  // };

  // const authorsReguest = async () => {
  //   try {
  //     const response = await fetch('http://localhost:4000/authors/all');
  //     const result = await response.json();
  //     const success = result.successful;
  //     console.log(result.result);
  //     if (!success) {
  //       alert('Something wrong...');
  //     } else {
  //       dispatch(getAllAUthors(result.result));
  //     }
  //   } catch (e) {
  //     alert(e);
  //     console.log(e);
  //   }
  // };

  // const search = (cours) => cours.filter((item) => item.title.toLowerCase().includes(filter) || item.id.toString().includes(filter));

  // useEffect(() => {
  //   if (filter) {
  //     setCourses(search(courses));
  //   } else {
  //     setCourses(mockedCoursesList);
  //   }
  //   setAuthors(authors);
  // }, [filter]);

  return (
    <div className={classes.mainCourses}>
      <div className={classes.mainSearchBar}>
        <SearchBar getFilterValue={getFilter} />
        <Button buttonText='Add new courses' type='button' onClick={createNewCourse} className={classes.buttonManipulation} />
      </div>
      {courses.map((course) => {
        const authorsName = course.authors.map((id) => authors.find((author) => author.id === id).name);
        return (
          <div className={classes.coursesCard}>
            <CourseCard coursesList={courses} authorList={authorsName} />
          </div>
        );
      })}
    </div>
  );
}

export default Courses;
