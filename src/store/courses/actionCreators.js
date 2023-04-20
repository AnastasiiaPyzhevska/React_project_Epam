import ActionTypes from './actionTypes';

export const getAllCourses = (payload) => ({
  type: ActionTypes.GET_COURSES,
  payload,
});

export const saveNewCourse = (payload) => ({
  type: ActionTypes.SAVE_NEW_COURSE,
  payload,
});

export const deleteCourse = (payload) => ({
  type: ActionTypes.DELETE_COURSE,
  payload,
});

export const changeCourse = (payload) => ({
  type: ActionTypes.UPDATE_COURSE,
  payload,
});
