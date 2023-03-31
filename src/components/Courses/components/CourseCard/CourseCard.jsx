import React from 'react';
import { Button } from '../../../../common/Button/Button.jsx';
import classes from './CourseCard.module.css';
import { convertTime } from '../../../../helpers/convertTime.js';

export const CourseCard = ({ coursesList, authorList }) => {
	return coursesList.length !== 0 ? (
		coursesList.map((item) => (
			<div key={item.id} className={classes.courseCard}>
				<div className={classes.description}>
					<h1>{item.title}</h1>
					<p>{item.description}</p>
				</div>
				<div className={classes.addInformation}>
					<p className={classes.author}>
						<strong>Authours: </strong>
						{authorList
							.filter((mockedItem) => item.authors.includes(mockedItem.id))
							.map((item) => item.name)
							.join(', ')}
					</p>
					<p>
						<strong>Duration:</strong> {convertTime(item.duration)}
					</p>
					<p>
						<strong>Created:</strong> {item.creationDate}
					</p>
					<div className={classes.buttonShowCourse}>
						<Button buttonText='Show course' type='button' />
					</div>
				</div>
			</div>
		))
	) : (
		<div>Courses List is empty</div>
	);
};
