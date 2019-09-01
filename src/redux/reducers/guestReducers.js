import { SENDING_EMAIL, SEND_EMAIL, GET_ERRORS, LOGGING_IN, LOGGED } from '../types';
import isEmpty from '../../utils/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  success: false,
  sendingEmail: false,
  loggingIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SENDING_EMAIL:
      return {
        ...state,
        success: false,
        sendingEmail: true,
      };
    case SEND_EMAIL:
      return {
        ...state,
        success: true,
        sendingEmail: false,
      };
    case LOGGING_IN:
      return {
        ...state,
        success: false,
        loggingIn: true,
      };
    case LOGGED:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loggingIn: false,
      };
    case GET_ERRORS: {
      return {
        ...state,
        sendingEmail: false,
        loggingIn: false,
      };
    }
    default:
      return state;
  }
};
