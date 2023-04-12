import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { mockedAuthorsList } from '../../constants';
import convertTime from '../../helpers/convertTime';
import classes from './CourseInfo.module.css';

function CourseInfo() {
  const location = useLocation();
  const navigator = useNavigate();
  const { id, title, description, duration, authors, creationDate } = location.state.item;

  const handleClick = (e) => {
    e.preventDefault();
    navigator('/courses');
  };

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
            {authors
              .filter((author) => mockedAuthorsList.includes(author.id))
              .map((item) => item.name)
              .join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
