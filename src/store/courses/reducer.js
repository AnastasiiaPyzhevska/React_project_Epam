import ActionTypes from './actionTypes';

const initialStateForCourses = {
  courses: [],
};

const coursesReducer = (state = initialStateForCourses, action) => {
  switch (action.type) {
    case ActionTypes.GET_COURSES:
      return { courses: action.payload };
    case ActionTypes.SAVE_NEW_COURSE:
      return { ...state, courses: [...state.courses, action.payload] };
    case ActionTypes.DELETE_COURSE:
      return { ...state, courses: [...state.courses.filter((course) => course.id !== action.payload)] };
    case ActionTypes.UPDATE_COURSE:
      return { ...state, courses: action.payload };
    default:
      return state;
  }
};

export default coursesReducer;
