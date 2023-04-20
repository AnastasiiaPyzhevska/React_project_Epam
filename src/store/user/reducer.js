import ActionTypes from './actionTypes';

const initialStateForUser = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
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

    default:
      return state;
  }
};

export default userReducer;
