import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
  errors: errorReducer,
  posts: postReducer,
});

export default rootReducer;
