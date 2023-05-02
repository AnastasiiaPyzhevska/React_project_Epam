import ActionTypes from './actionTypes';
import { coursesRequest, deleteCourseById, addNewCourse, updateCourseById } from '../../ApiServises';

export const fetchGetAllCourses = () => async (dispatch) => {
  const response = await coursesRequest();
  const dataCourses = response.result;
  dispatch({ type: ActionTypes.GET_COURSES, payload: dataCourses });
};

export const fetchSaveNewCourse = (newCourse) => async (dispatch) => {
  const response = await addNewCourse(newCourse);
  const dataCourses = response.result;
  dispatch({ type: ActionTypes.SAVE_NEW_COURSE, payload: dataCourses });
};

export const fetchDeleteCourse = (idCourse) => async (dispatch) => {
  const response = await deleteCourseById(idCourse);
  dispatch({ type: ActionTypes.DELETE_COURSE, payload: response });
};

export const fetchUpdateCourse = (id, courses) => async (dispatch) => {
  const response = await updateCourseById(id, courses);
  const dataCourses = response.result;
  dispatch({ type: ActionTypes.UPDATE_COURSE, payload: dataCourses });
};
