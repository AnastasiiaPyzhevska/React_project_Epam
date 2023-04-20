import ActionTypes from './actionTypes';

export const getAllAUthors = (payload) => ({
  type: ActionTypes.GET_AUTHORS,
  payload,
});
export const saveNewAuthor = (payload) => ({
  type: ActionTypes.SAVE_NEW_AUTHOR,
  payload,
});
