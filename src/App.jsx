import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import './App.css';
import CreateCourses from './components/Courses/components/CourseForm/CourseForm';
import Logo from './components/Header/components/Logo/Logo';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { authorsRequest, coursesRequest } from './servises';
import { getAllAUthors } from './store/authors/actionCreators';
import { getAllCourses } from './store/courses/actionCreators';
import { userLogin } from './store/user/actionCreators';

function App() {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem('token');
  const userName = localStorage.getItem('name');

  const fetchCourses = async () => {
    const response = await coursesRequest();
    dispatch(getAllCourses(response.result));
  };

  const fetchAuthors = async () => {
    const response = await authorsRequest();
    dispatch(getAllAUthors(response.result));
  };

  useEffect(() => {
    if (userToken) {
      dispatch(userLogin({ isAuth: true, name: userName }));
    }
    fetchAuthors();
    fetchCourses();
  }, [dispatch]);

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
