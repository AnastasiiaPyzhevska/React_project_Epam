import ActionTypes from './actionTypes';
import { authorsRequest, addNewAuthor } from '../../ApiServises';

export const fetchGetAllAuthors = () => async (dispatch) => {
  const response = await authorsRequest();
  const dataAuthors = response.result;
  dispatch({ type: ActionTypes.GET_AUTHORS, payload: dataAuthors });
};

export const fetchSaveNewAuthor = (newAuthor) => async (dispatch) => {
  const response = await addNewAuthor(newAuthor);
  const dataAuthor = response.result;
  console.log(response);
  dispatch({ type: ActionTypes.SAVE_NEW_AUTHOR, payload: dataAuthor });
};
