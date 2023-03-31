import React from 'react';
import Header from './components/Header/Header.jsx';
import Courses from './components/Courses/Courses.jsx';
import './App.css';

const App = () => {
	return (
		<div className='main'>
			<Header />
			<Courses />
		</div>
	);
};

export default App;
