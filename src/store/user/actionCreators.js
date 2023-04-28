import ActionTypes from './actionTypes';

export const userLogin = (user) => ({ type: ActionTypes.LOGIN, payload: user });
export const userLogout = () => ({
  type: ActionTypes.LOGOUT,
});
export const getCurrentUserRole = (payload) => ({ type: ActionTypes.ROLE_USER, payload });
