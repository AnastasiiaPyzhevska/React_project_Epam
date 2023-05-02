import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TitleInput from './components/TitleInput';
import DescriptionInput from './components/DescriptionInput';
import CreateAuthor from './components/CreateAuthor';
import AddAuthorsToList from './components/AddAuthorsToList';
import RemoveAuthorsFromList from './components/RemoveAuthorsFromList';
import classes from './CourseForm.module.css';
import DurationInput from './components/DurationInput';
import { getAuthors, getCourses } from '../../../../store/selectors';
import { fetchSaveNewCourse, fetchUpdateCourse, fetchGetAllCourses } from '../../../../store/courses/thunk';
import { fetchSaveNewAuthor } from '../../../../store/authors/thunk';

function CourseForm() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const authorsList = useSelector(getAuthors);
  const coursesList = useSelector(getCourses);
  const param = useParams();

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
  const [creationDate, setCreationDate] = useState('');

  useEffect(() => {
    if (param.id) {
      const upDateCourse = coursesList.find((course) => course.id === param.id);
      const { title, description, authors, duration, creationDate } = upDateCourse;
      const selectedAuthors = authorsList.filter((author) => authors.includes(author.id));
      const displayedAuthors = authorsList.filter((author) => !authors.includes(author.id));
      setTitle(title);
      setDuration(duration);
      setDescription(description);
      setCreationDate(creationDate);
      setSelectedAuthors(selectedAuthors);
      setDisplayAuthors(displayedAuthors);
    }
  }, [param]);

  const handleCourse = useCallback(
    async (e) => {
      e.preventDefault();
      const selectedAuthorNames = selectedAuthors.map((selectedAuthor) => selectedAuthor.name);
      const authorIds = authorsList.filter((authorItem) => selectedAuthorNames.includes(authorItem.name)).map((authorItem) => authorItem.id);
      console.log(authorIds);
      if (title && description && duration && selectedAuthors.length !== 0) {
        const currentCourse = {
          title,
          description,
          duration,
          authors: authorIds,
          id: uuidv4(),
          creationDate: new Date().toLocaleDateString('en-GB'),
        };

        if (param.id) {
          dispatch(fetchUpdateCourse(param.id, currentCourse)).then(async () => {
            await dispatch(fetchGetAllCourses());
            navigator('/courses');
          });
        } else {
          console.log('fetchSaveNewCourse');
          await dispatch(fetchSaveNewCourse(currentCourse));
          navigator('/courses');
        }
      } else {
        alert('Something wrong... Fill all inputs and choose author/s');
      }
    },
    [[title, description, duration, selectedAuthors, dispatch]]
  );

  const createNewAuthor = useCallback(
    async (e) => {
      e.preventDefault();
      const newAuthor = {
        name: author,
      };
      await dispatch(fetchSaveNewAuthor(newAuthor));
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
        setDuration(Number(e.target.value));
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
          handleCourse={handleCourse}
          courseID={param.id}
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

export default CourseForm;
