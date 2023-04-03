import React, { useEffect, useState } from 'react';
import { Button } from '../../../../common/Button/Button.jsx';
import Input from '../../../../common/Input/Input.jsx';
import classes from './CreateCourses.module.css';
import { mockedAuthorsList, mockedCoursesList } from '../../../../constants.js';
import { convertTime } from '../../../../helpers/convertTime.js';
import { v4 as uuidv4 } from 'uuid';
import Courses from '../../Courses.jsx';

const CreateCourses = ({ coursesList, authorList, isNewPost }) => {
	const [courses, setCourses] = useState(coursesList || mockedCoursesList);
	const [authorsList, setAuthorsList] = useState(authorList || mockedAuthorsList);
	const [isNewCourses, setIsNewCourses] = useState(isNewPost);

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

	const createNewCource = (e) => {
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
			setCourses([...courses, newCource]);
			setIsNewCourses(!isNewCourses);
		} else {
			alert('Something wrong... Fill all inputs and choose author/s');
		}
	};

	const createNewAuthor = (e) => {
		e.preventDefault();
		const newAuthor = {
			id: uuidv4(),
			name: author,
		};
		setNewAuthor([...isNewAuthor, newAuthor]);
		setAuthorsList([...authorsList, newAuthor]);
		setAuthor('');
	};

	const removeAuthorFromList = (author, event, index) => {
		event.preventDefault();
		setSelectedAuthors(selectedAuthors.filter((aut) => aut.name !== author.name));
		setAuthorsList([...authorsList, author]);
	};

	const addAuthorFromList = (author, event, index) => {
		event.preventDefault();
		setSelectedAuthors([...selectedAuthors, author]);
		setAuthorsList(authorsList.filter((aut) => aut.name !== author.name));
	};

	const validateInput = (value, minLength, errorSetter) => {
		const re = new RegExp(`^[\\w\\d]{${minLength},}$`, 'gm');
		if (!re.test(String(value).toLowerCase())) {
			errorSetter(`Enter at least ${minLength} characters`);
		} else {
			errorSetter('');
		}
	};

	const titleHandler = (e) => {
		e.preventDefault();
		setTitle(e.target.value);
		validateInput(e.target.value, 2, setTitleError);
	};
	const descriptionHandler = (e) => {
		e.preventDefault();
		setDescription(e.target.value);
		validateInput(e.target.value, 2, setDescriptionError);
	};

	const authorHandler = (e) => {
		e.preventDefault();
		setAuthor(e.target.value);
		validateInput(e.target.value, 2, setAuthorError);
	};

	const durationHandler = (e) => {
		e.preventDefault();
		setDuration(e.target.value);
		const re = /^[0-9\b]+$/;
		if (re.test(e.target.value) && e.target.value > 0) {
			setDurationError('');
		} else {
			setDurationError('Enter duration at least 1 minutes');
		}
	};

	useEffect(() => {
		isNewCourses ? <Courses courses={courses} authors={isNewAuthor} isNewCourse={isNewCourses} /> : <CreateCourses />;
	}, [isNewCourses, courses, isNewAuthor]);

	const onBlurHandle = (e) => {
		e.preventDefault();
		switch (e.target.name) {
			case 'title':
				setTitleDirty(true);
				break;
			case 'author':
				setAuthorDirty(true);
				break;
			case 'description':
				setDescriptionDirty(true);
				break;
			case 'duration':
				setDurationDirty(true);
				break;
		}
	};

	return isNewCourses === false ? (
		<Courses newCourses={courses} newAuthors={isNewAuthor} isNewCourse={isNewCourses} />
	) : (
		<div className={classes.ceateCourses}>
			<form>
				<h3 className={classes.header}>Title </h3>
				{titleDirty && titleError && (
					<div
						style={{
							color: 'red',
							display: 'flex',
							alignContent: 'center',
							justifyContent: 'center',
							fontSize: '12px',
						}}
					>
						{titleError}
					</div>
				)}
				<div className={classes.createCoursesTitle}>
					<Input
						labelText='title'
						type='text'
						placeholderText='Enter title...'
						value={title}
						name='title'
						onBlur={(e) => onBlurHandle(e)}
						onChange={(e) => titleHandler(e)}
					/>
					<Button buttonText='Create course' type='button' onClick={createNewCource} className={classes.buttonManipulation} />
				</div>
				<h3 className={classes.header}>Description</h3>
				{descriptionDirty && descriptionError && (
					<div
						style={{
							color: 'red',
							display: 'flex',
							alignContent: 'center',
							justifyContent: 'center',
							fontSize: '12px',
						}}
					>
						{descriptionError}
					</div>
				)}
				<textarea
					placeholder='Enter description'
					className={classes.description}
					value={description}
					name='description'
					onChange={(e) => descriptionHandler(e)}
					onBlur={(e) => onBlurHandle(e)}
				></textarea>
				<div className={classes.blockAuthor}>
					<div className={classes.createAuthorAndDuration}>
						<div className={classes.createAuthor}>
							<h3>Add author:</h3>
							<p>Author name</p>
							{authorDirty && authorError && (
								<div
									style={{
										color: 'red',
										display: 'flex',
										alignContent: 'center',
										justifyContent: 'center',
										fontSize: '12px',
									}}
								>
									{authorError}
								</div>
							)}
							<div>
								<Input
									labelText='create_author'
									type='text'
									placeholderText='Enter author name...'
									value={author}
									name='author'
									onChange={(e) => authorHandler(e)}
									onBlur={(e) => onBlurHandle(e)}
								/>
								<div className={classes.createAuthorButton}>
									<Button buttonText='Create author' type='button' onClick={createNewAuthor} />
								</div>
							</div>
						</div>
						<div className={classes.createDuration}>
							<h3>Duration:</h3>
							<p>Duration</p>
							{durationDirty && durationError && (
								<div
									style={{
										color: 'red',
										display: 'flex',
										alignContent: 'center',
										justifyContent: 'center',
										fontSize: '12px',
									}}
								>
									{durationError}
								</div>
							)}
							<Input
								type='number'
								placeholderText='Enter duration in minutes...'
								value={duration}
								min='1'
								name='duration'
								onChange={(e) => durationHandler(e)}
								onBlur={(e) => onBlurHandle(e)}
							/>
							<p className={classes.durationConvert}>Duration: {convertTime(duration)}</p>
						</div>
					</div>
					<div className={classes.authorSet}>
						<div className={classes.authorList}>
							<h3>Authors</h3>
							<ul>
								{authorsList.map((author, index) => (
									<React.Fragment key={index}>
										<div className={classes.authorItems}>
											<li key={index}>{author.name}</li>
											<Button buttonText='Add author' type='button' onClick={(e) => addAuthorFromList(author, e, index)} />
										</div>
									</React.Fragment>
								))}
							</ul>
						</div>

						<div className={classes.authorAddSet}>
							<h3>Course authors</h3>
							{selectedAuthors.length > 0 ? (
								<ul>
									{selectedAuthors.map((author, index) => (
										<React.Fragment key={index}>
											<div className={classes.authorItems}>
												<li key={index}>{author.name}</li>
												<Button buttonText='Remove author' type='button' onClick={(e) => removeAuthorFromList(author, e, index)} />
											</div>
										</React.Fragment>
									))}
								</ul>
							) : (
								<p>Author list is empty</p>
							)}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreateCourses;
