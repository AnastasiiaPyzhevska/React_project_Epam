import ActionTypes from './actionTypes';

export const userLogin = (user) => ({ type: ActionTypes.LOGIN, payload: user });
export const userLogout = (user) => ({
  type: ActionTypes.LOGOUT,
  payload: user,
});
