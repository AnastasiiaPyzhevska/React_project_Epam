import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TitleInput from './components/TitleInput';
import DescriptionInput from './components/DescriptionInput';
import CreateAuthor from './components/CreateAuthor';
import AddAuthorsToList from './components/AddAuthorsToList';
import RemoveAuthorsFromList from './components/RemoveAuthorsFromList';
import classes from './CourseForm.module.css';
import DurationInput from './components/DurationInput';
import { saveNewCourse } from '../../../../store/courses/actionCreators';
import { saveNewAuthor } from '../../../../store/authors/actionCreators';
import { getAuthors } from '../../../../store/selectors';

function CreateCourses() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const authorsList = useSelector(getAuthors);
  const [displayAuthors, setDisplayAuthors] = useState(authorsList.sort((a1, a2) => (a1.name < a2.name ? -1 : 1)));

  const [title, setTitle] = useState('');
  const [titleDirty, setTitleDirty] = useState(false);
  const [titleError, setTitleError] = useState('Can`t be empty...');

  const [description, setDescription] = useState('');
  const [descriptionDirty, setDescriptionDirty] = useState(false);
  const [descriptionError, setDescriptionError] = useState('Can`t be empty...');

  const [author, setAuthor] = useState('');
  const [authorDirty, setAuthorDirty] = useState(false);
  const [authorError, setAuthorError] = useState('Can`t be empty...');

  const [duration, setDuration] = useState('');
  const [durationDirty, setDurationDirty] = useState(false);
  const [durationError, setDurationError] = useState('Can`t be empty...');

  const [selectedAuthors, setSelectedAuthors] = useState([]);

  const createNewCource = useCallback(
    (e) => {
      e.preventDefault();
      if (title && description && duration && selectedAuthors.length !== 0) {
        const newCource = {
          title,
          description,
          duration,
          authors: selectedAuthors.map((auth) => auth.id),
          id: uuidv4(),
          creationDate: new Date().toLocaleDateString('en-GB'),
        };
        dispatch(saveNewCourse(newCource));
        navigator('/courses');
      } else {
        alert('Something wrong... Fill all inputs and choose author/s');
      }
    },
    [[title, description, duration, selectedAuthors]]
  );

  const createNewAuthor = useCallback(
    (e) => {
      e.preventDefault();
      const newAuthor = {
        id: uuidv4(),
        name: author,
      };
      dispatch(saveNewAuthor(newAuthor));
      setDisplayAuthors([...displayAuthors, newAuthor].sort((a1, a2) => (a1.name < a2.name ? -1 : 1)));
      setAuthor('');
    },
    [author, dispatch]
  );

  const removeAuthorHandler = useCallback(
    (authorsRemove, event) => {
      event.preventDefault();
      setSelectedAuthors(selectedAuthors.filter((aut) => aut.name !== authorsRemove.name));
      setDisplayAuthors([...displayAuthors, authorsRemove].sort((a1, a2) => (a1.name < a2.name ? -1 : 1)));
    },
    [selectedAuthors, authorsList]
  );

  const addAuthorHandler = useCallback(
    (authorsAdd, event) => {
      event.preventDefault();
      setSelectedAuthors([...selectedAuthors, authorsAdd]);
      setDisplayAuthors(displayAuthors.filter((aut) => aut.name !== authorsAdd.name));
    },
    [selectedAuthors, displayAuthors]
  );

  const validateInput = (value, minLength, errorSetter) => {
    const re = new RegExp(`^[\\w\\d\\s]{${minLength},}$`, 'gm');
    if (!re.test(String(value).toLowerCase())) {
      errorSetter(`Enter at least ${minLength} characters`);
    } else {
      errorSetter('');
    }
  };

  const titleHandler = useCallback(
    (e) => {
      e.preventDefault();
      setTitle(e.target.value);
      validateInput(e.target.value, 2, setTitleError);
    },
    [setTitle, setTitleError]
  );

  const descriptionHandler = useCallback(
    (e) => {
      e.preventDefault();
      setDescription(e.target.value);
      validateInput(e.target.value, 2, setDescriptionError);
    },
    [setDescription, setDescriptionError]
  );

  const authorHandler = useCallback(
    (e) => {
      e.preventDefault();
      setAuthor(e.target.value);
      validateInput(e.target.value, 2, setAuthorError);
    },
    [setAuthor, setAuthorError]
  );

  const durationHandler = useCallback(
    (e) => {
      e.preventDefault();
      setDuration(e.target.value);
      const re = /^[0-9\b]+$/;
      if (re.test(e.target.value) && e.target.value > 0) {
        setDurationError('');
      } else {
        setDurationError('Enter duration at least 1 minutes');
      }
    },
    [setDuration, setDurationError]
  );

  const onBlurHandle = useCallback(
    (e) => {
      e.preventDefault();
      const inputNameToSetter = {
        title: setTitleDirty,
        author: setAuthorDirty,
        description: setDescriptionDirty,
        duration: setDurationDirty,
      };
      const setter = inputNameToSetter[e.target.name];
      if (setter) {
        setter(true);
      }
    },
    [setTitleDirty, setAuthorDirty, setDescriptionDirty, setDurationDirty]
  );

  return (
    <div className={classes.ceateCourses}>
      <form>
        <TitleInput
          classes={classes}
          titleDirty={titleDirty}
          titleError={titleError}
          title={title}
          onBlurHandle={onBlurHandle}
          titleHandler={titleHandler}
          createNewCource={createNewCource}
        />
        <DescriptionInput
          classes={classes}
          descriptionDirty={descriptionDirty}
          descriptionError={descriptionError}
          description={description}
          onBlurHandle={onBlurHandle}
          descriptionHandler={descriptionHandler}
        />
        <div className={classes.blockAuthor}>
          <div className={classes.createAuthorAndDuration}>
            <CreateAuthor
              classes={classes}
              authorDirty={authorDirty}
              authorError={authorError}
              author={author}
              onBlurHandle={onBlurHandle}
              authorHandler={authorHandler}
              createNewAuthor={createNewAuthor}
            />
            <DurationInput
              classes={classes}
              durationDirty={durationDirty}
              durationError={durationError}
              duration={duration}
              onBlurHandle={onBlurHandle}
              durationHandler={durationHandler}
            />
          </div>
          <div className={classes.authorSet}>
            <AddAuthorsToList classes={classes} authorsList={displayAuthors} addAuthorFromList={addAuthorHandler} />
            <RemoveAuthorsFromList classes={classes} selectedAuthors={selectedAuthors} removeAuthorFromList={removeAuthorHandler} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCourses;
