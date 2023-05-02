import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import './App.css';
import CourseForm from './components/Courses/components/CourseForm/CourseForm';
import Registration from './components/Registration/Registration';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { userLogin } from './store/user/actionCreators';
import { fetchCurrentUser } from './store/user/thunk';

function App() {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem('token');
  const userName = localStorage.getItem('name');

  const fetchCurrentUserRole = async () => {
    await dispatch(fetchCurrentUser());
  };

  useEffect(() => {
    if (userToken) {
      dispatch(userLogin({ isAuth: true, name: userName }));
    }
    fetchCurrentUserRole();
  }, [dispatch, userToken]);

  return (
    <div className='main'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateRouter />}>
            <Route path='/courses/add' element={<CourseForm />} exact />
            <Route path='/courses/update/:id' element={<CourseForm />} exact />
          </Route>
          <Route path='/registration' element={<Registration />} />
          <Route path='/courses' element={<Courses />} exact />
          <Route path='/login' element={<Login />} />
          <Route path='/courses/:id' element={<CourseInfo />} exact />
          <Route path='/*' element={<Navigate replace to='/login' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
