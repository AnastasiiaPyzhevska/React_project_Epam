import ActionTypes from './actionTypes';

const initialStateForAuthors = {
  authors: [],
};

const authorsReducer = (state = initialStateForAuthors, action) => {
  switch (action.type) {
    case ActionTypes.GET_AUTHORS:
      return [...action.payload];
    case ActionTypes.SAVE_NEW_AUTHOR:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default authorsReducer;
