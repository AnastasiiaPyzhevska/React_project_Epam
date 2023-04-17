import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../../../common/Button/Button';
import classes from './CourseCard.module.css';
import convertTime from '../../../../helpers/convertTime';

function CourseCard({ coursesList, authorList }) {
  const navigate = useNavigate();
  // console.dir('CourseCard arguments');
  // eslint-disable-next-line prefer-rest-params
  // console.dir(arguments);

  const handleShowClick = (e, course) => {
    e.preventDefault();
    navigate(`/courses/${course.id}`, { state: { course } });
  };

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
              .filter((mockedItem) => {
                console.log('mockedItem');
                console.log(mockedItem);
                return item.authors.includes(mockedItem.id);
              })
              .map((author) => author.name)
              .join(', ')}
          </p>
          <p>
            <strong>Duration:</strong> {convertTime(item.duration.toString())}
          </p>
          <p>
            <strong>Created:</strong> {item.creationDate}
          </p>
          <div className={classes.buttonShowCourse}>
            <Button buttonText='Show course' type='button' onClick={(e) => handleShowClick(e, item)} />
          </div>
        </div>
      </div>
    ))
  ) : (
    <div>Courses List is empty</div>
  );
}

CourseCard.propTypes = {
  coursesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string).isRequired,
      creationDate: PropTypes.string.isRequired,
      duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  authorList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CourseCard;
