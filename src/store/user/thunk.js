import ActionTypes from './actionTypes';
import { authorizeUserRequest, loginRequest, logoutRequest } from '../../ApiServises';

export const fetchCurrentUser = () => async (dispatch) => {
  const response = await authorizeUserRequest();
  dispatch({ type: ActionTypes.ROLE_USER, payload: response });
};

export const fetchLoginUser = (user) => async (dispatch) => {
  const response = await loginRequest(user);
  dispatch({ type: ActionTypes.LOGIN, payload: response });
};

export const fetchLogoutUser = () => async (dispatch) => {
  await logoutRequest();
  dispatch({ type: ActionTypes.LOGOUT });
};
