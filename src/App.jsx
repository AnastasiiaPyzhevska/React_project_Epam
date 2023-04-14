import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import './App.css';
import CreateCourses from './components/Courses/components/CreateCourses/CreateCourses';
import Logo from './components/Header/components/Logo/Logo';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { getUserAuth } from './store/selectors';
// import store from './store/index';

function App() {
  const userToken = useSelector(getUserAuth);

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
