import ActionTypes from './actionTypes';

const initialStateForAuthors = {
  authors: [],
};

const authorsReducer = (state = initialStateForAuthors, action) => {
  switch (action.type) {
    case ActionTypes.GET_AUTHORS:
      return { autors: action.payload };
    case ActionTypes.SAVE_NEW_AUTHOR:
      return { ...state, autors: [...state.autors, action.payload] };
    default:
      return state;
  }
};

export default authorsReducer;
