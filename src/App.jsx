import React, { useState } from 'react';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import './App.css';
import CreateCourses from './components/Courses/components/CreateCourses/CreateCourses';

function App() {
  const [isAddCourse, setIsAddCourse] = useState(false);
  return (
    <div className='main'>
      <Header />
      {isAddCourse ? <CreateCourses setIsNewCourse={setIsAddCourse} /> : <Courses setIsNewCourse={setIsAddCourse} />}
    </div>
  );
}

export default App;
