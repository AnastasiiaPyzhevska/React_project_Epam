import ActionTypes from './actionTypes';

export const getAllCourses = (courses) => ({
  type: ActionTypes.GET_COURSES,
  payload: courses,
});

export const saveNewCourse = (course) => ({
  type: ActionTypes.SAVE_NEW_COURSE,
  payload: course,
});

export const deleteCourse = (course) => ({
  type: ActionTypes.DELETE_COURSE,
  payload: course,
});

export const changeCourse = (course) => ({
  type: ActionTypes.UPDATE_COURSE,
  payload: course,
});
