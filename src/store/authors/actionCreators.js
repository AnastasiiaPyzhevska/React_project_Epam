import ActionTypes from './actionTypes';

export const getAllAUthors = (authors) => ({
  type: ActionTypes.GET_AUTHORS,
  payload: authors,
});
export const saveNewAuthor = (author) => ({
  type: ActionTypes.SAVE_NEW_AUTHOR,
  payload: author,
});
