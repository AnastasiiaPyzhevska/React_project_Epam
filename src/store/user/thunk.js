import ROLE_USER from './actionTypes';

const getRoleUser = () => async (dispatch) => {
  const url = 'http://localhost:4000/users/me';
  const setHeaders = { headers: { 'Content-Type': 'application/json', Authorization: localStorage.token } };
  let response = await fetch(url, { setHeaders });
  response = await response.json();
  console.log(response);
  const userRole = response.result.role;
  dispatch({ type: ROLE_USER, payload: userRole });
};

export default getRoleUser;
