import ActionTypes from './actionTypes';

const initialStateForUser = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
  role: '',
};

const userReducer = (state = initialStateForUser, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        name: action.payload.name,
        token: action.payload.token,
        email: action.payload.email,
        isAuth: true,
      };
    case ActionTypes.LOGOUT:
      return { ...state, ...initialStateForUser };
    case ActionTypes.ROLE_USER:
      // return { ...state, role: action.payload };
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userReducer;
