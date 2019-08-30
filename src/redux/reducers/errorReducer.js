import { GET_ERRORS, CLEAN_ERRORS } from '../types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAN_ERRORS:
      return {};
    default:
      return state;
  }
};
