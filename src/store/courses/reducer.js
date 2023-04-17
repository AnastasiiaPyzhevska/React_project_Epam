import ActionTypes from './actionTypes';

const initialStateForCourses = {
  courses: [],
};

const coursesReducer = (state = initialStateForCourses, action) => {
  switch (action.type) {
    case ActionTypes.GET_COURSES:
      // return [...state, action.payload];
      return { courses: action.payload };
    case ActionTypes.SAVE_NEW_COURSE:
      return [...state, ...action.payload];
    case ActionTypes.DELETE_COURSE:
      return [...action.payload];
    case ActionTypes.UPDATE_COURSE:
      return [...action.payload];
    default:
      return state;
  }
};

export default coursesReducer;
