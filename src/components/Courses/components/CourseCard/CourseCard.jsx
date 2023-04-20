import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteCourse } from '../../../../store/courses/actionCreators';
import Button from '../../../../common/Button/Button';
import classes from './CourseCard.module.css';
import convertTime from '../../../../helpers/convertTime';
import trash from '../../../../common/Button/trash-solid.svg';
import pen from '../../../../common/Button/pen-to-square-solid.svg';

function CourseCard({ course, authorList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowClick = useCallback(
    (e, clickedCourse) => {
      e.preventDefault();
      navigate(`/courses/${course.id}`, { state: { clickedCourse } });
    },
    [course.id]
  );

  const handleDeleteClick = useCallback(
    (e, clickedCourse) => {
      e.preventDefault();
      const idCourse = clickedCourse.id;
      dispatch(deleteCourse(idCourse));
    },
    [dispatch]
  );

  return !course.length ? (
    <div key={course.id} className={classes.courseCard}>
      <div className={classes.description}>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </div>
      <div className={classes.addInformation}>
        <p className={classes.author}>
          <strong>Authours: </strong>
          {authorList
            .filter((mockedItem) => course.authors.includes(mockedItem.id))
            .map((author) => (
              <span key={author.id}>{author.name} </span>
            ))}
        </p>
        <p>
          <strong>Duration:</strong> {convertTime(course.duration.toString())}
        </p>
        <p>
          <strong>Created:</strong> {course.creationDate}
        </p>
        <div className={classes.buttonShowCourse}>
          <Button buttonText='Show course' type='button' onClick={(e) => handleShowClick(e, course)} />
          <Button type='button' icon={trash} onClick={(e) => handleDeleteClick(e, course)} />
          <Button type='button' icon={pen} />
        </div>
      </div>
    </div>
  ) : (
    <div>Courses List is empty</div>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    creationDate: PropTypes.string.isRequired,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  authorList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CourseCard;
