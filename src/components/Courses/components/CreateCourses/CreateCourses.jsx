import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import TitleInput from './components/TitleInput';
import DescriptionInput from './components/DescriptionInput';
import CreateAuthor from './components/CreateAuthor';
import AddAuthorsToList from './components/AddAuthorsToList';
import RemoveAuthorsFromList from './components/RemoveAuthorsFromList';
import classes from './CreateCourses.module.css';
import { mockedAuthorsList, mockedCoursesList } from '../../../../constants';
import DurationInput from './components/DurationInput';

function CreateCourses({ setIsNewCourse }) {
  const [authorsList, setAuthorsList] = useState(mockedAuthorsList);
  const [isNewAuthor, setNewAuthor] = useState(mockedAuthorsList);

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
        mockedCoursesList.push(newCource);
        setIsNewCourse(false);
      } else {
        alert('Something wrong... Fill all inputs and choose author/s');
      }
    },
    [[title, description, duration, selectedAuthors, setIsNewCourse]]
  );

  const createNewAuthor = useCallback(
    (e) => {
      e.preventDefault();
      const newAuthor = {
        id: uuidv4(),
        name: author,
      };
      setNewAuthor([...isNewAuthor, newAuthor]);
      setAuthorsList([...authorsList, newAuthor]);
      mockedAuthorsList.push(newAuthor);
      setAuthor('');
    },
    [author, setNewAuthor, authorsList]
  );

  const removeAuthorHandler = useCallback(
    (authorsRemove, event) => {
      event.preventDefault();
      setSelectedAuthors(selectedAuthors.filter((aut) => aut.name !== authorsRemove.name));
      setAuthorsList([...authorsList, authorsRemove]);
    },
    [selectedAuthors, authorsList]
  );

  const addAuthorHandler = useCallback(
    (authorsAdd, event) => {
      event.preventDefault();
      setSelectedAuthors([...selectedAuthors, authorsAdd]);
      setAuthorsList(authorsList.filter((aut) => aut.name !== authorsAdd.name));
    },
    [selectedAuthors, authorsList]
  );

  const validateInput = (value, minLength, errorSetter) => {
    const re = new RegExp(`^[\\w\\d]{${minLength},}$`, 'gm');
    if (!re.test(String(value).toLowerCase())) {
      errorSetter(`Enter at least ${minLength} characters`);
    } else {
      errorSetter('');
    }
  };

  const titleHandler = useCallback((e) => {
    e.preventDefault();
    setTitle(e.target.value);
    validateInput(e.target.value, 2, setTitleError);
  }, []);

  const descriptionHandler = useCallback((e) => {
    e.preventDefault();
    setDescription(e.target.value);
    validateInput(e.target.value, 2, setDescriptionError);
  }, []);

  const authorHandler = useCallback((e) => {
    e.preventDefault();
    setAuthor(e.target.value);
    validateInput(e.target.value, 2, setAuthorError);
  }, []);

  const durationHandler = useCallback((e) => {
    e.preventDefault();
    setDuration(e.target.value);
    const re = /^[0-9\b]+$/;
    if (re.test(e.target.value) && e.target.value > 0) {
      setDurationError('');
    } else {
      setDurationError('Enter duration at least 1 minutes');
    }
  }, []);

  const onBlurHandle = (e) => {
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
  };

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
            <AddAuthorsToList classes={classes} authorsList={authorsList} addAuthorFromList={addAuthorHandler} />
            <RemoveAuthorsFromList classes={classes} selectedAuthors={selectedAuthors} removeAuthorFromList={removeAuthorHandler} />
          </div>
        </div>
      </form>
    </div>
  );
}

CreateCourses.propTypes = {
  setIsNewCourse: PropTypes.func.isRequired,
};

export default CreateCourses;
