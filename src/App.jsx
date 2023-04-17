import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import './App.css';
import CreateCourses from './components/Courses/components/CreateCourses/CreateCourses';
import Logo from './components/Header/components/Logo/Logo';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { getUserAuth, getCourses, getAuthors } from './store/selectors';
import { authorsReguest, coursesReguest } from './servises';
import { getAllAUthors } from './store/authors/actionCreators';
import { getAllCourses } from './store/courses/actionCreators';

// import store from './store/index';

function App() {
  const dispatch = useDispatch();
  const userToken = useSelector(getUserAuth);
  const courses = useSelector(getCourses);
  const authors = useSelector(getAuthors);

  // const fetchCourses = useCallback(async () => {
  //   try {
  //     const result = await coursesReguest();
  //     console.log('resul1t');
  //     console.log(result);
  //     dispatch(getAllCourses(result.result));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [dispatch]);
  const fetchCourses = async () => {
    const response = await coursesReguest();
    console.log('response');
    console.log(response);
    dispatch(getAllCourses(response.result));
  };

  const fetchAuthors = async () => {
    const response = await authorsReguest();
    console.log('response');
    console.log(response);
    dispatch(getAllAUthors(response.result));
  };

  // const fetchAuthors = useCallback(async () => {
  //   try {
  //     const result = await authorsReguest();
  //     console.log('resul2t');
  //     console.log(result);
  //     dispatch(getAllAUthors(result.result));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [dispatch]);

  useEffect(() => {
    fetchAuthors();
    fetchCourses();
  }, [fetchAuthors, fetchCourses, userToken]);

  return (
    <div className='main'>
      <BrowserRouter>
        {!userToken ? (
          <div className='header'>
            <Logo />
          </div>
        ) : (
          <Header />
        )}
        <Routes>
          <Route path='/registration' element={<Registration />} />
          <Route path='/courses' element={<Courses />} exact />
          <Route path='/login' element={<Login />} />
          <Route path='/courses' element={<CreateCourses />} exact />
          <Route path='/courses/:id' element={<CourseInfo />} exact />
          <Route path='/courses/add' element={<CreateCourses />} exact />
          <Route path='/*' element={<Navigate replace to='/login' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
