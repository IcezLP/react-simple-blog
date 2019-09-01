import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import postReducer from './postReducer';
import guestReducers from './guestReducers';

const rootReducer = combineReducers({
  errors: errorReducer,
  posts: postReducer,
  guest: guestReducers,
});

export default rootReducer;
