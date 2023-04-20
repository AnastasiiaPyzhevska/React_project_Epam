import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../common/Button/Button';
import convertTime from '../../helpers/convertTime';
import classes from './CourseInfo.module.css';
import { getAuthors } from '../../store/selectors';

function CourseInfo() {
  const location = useLocation();
  const navigator = useNavigate();
  const authorsList = useSelector(getAuthors);
  const { id, title, description, duration, authors, creationDate } = location.state.clickedCourse;

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      navigator('/courses');
    },
    [navigator]
  );

  return (
    <div className={classes.courseInfo}>
      <div className={classes.button}>
        <Button buttonText='Back to courses' type='button' onClick={(e) => handleClick(e)} />
      </div>
      <h1>{title}</h1>
      <div className={classes.courseInfoContent}>
        <div className={classes.courseInfoDescription}>
          <p>{description}</p>
        </div>
        <div className={classes.courseInfoAddInfo}>
          <p>
            <strong>ID:</strong> {id}
          </p>
          <p>
            <strong>Duration:</strong> {convertTime(duration)}
          </p>
          <p>
            <strong>Created:</strong> {creationDate}
          </p>
          <p>
            <strong>Authours: </strong>
            {authorsList
              .filter((author) => authors.includes(author.id))
              .map((item) => (
                <span key={item.id}>{item.name} </span>
              ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
