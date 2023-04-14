import { combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './user/reducer';
// import { authorsReducer } from './authors/reducer';
// import { coursesReducer } from './courses/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  //   courses: coursesReducer,
  //   authors: authorsReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
