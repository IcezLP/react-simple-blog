import axios from 'axios';
import decode from 'jwt-decode';
import { SENDING_EMAIL, SEND_EMAIL, GET_ERRORS, CLEAN_ERRORS, LOGGING_IN, LOGGED } from '../types';
import setAuthToken from '../../utils/setAuthToken';

const BASE_URL = '/api/v1/guest';

// Send email
export const sendEmail = (data) => async (dispatch) => {
  await dispatch({
    type: SENDING_EMAIL,
  });

  try {
    const response = await axios.post(`${BASE_URL}/contact`, data);
    await dispatch({
      type: SEND_EMAIL,
      payload: response.data,
    });
    await dispatch({
      type: CLEAN_ERRORS,
    });
  } catch (err) {
    await dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const logInUser = (data) => async (dispatch) => {
  await dispatch({
    type: LOGGING_IN,
  });

  try {
    const response = await axios.post(`${BASE_URL}/login`, data);
    const { token } = response.data;

    localStorage.setItem('token', token);

    setAuthToken(token);

    const decoded = decode(token);

    await dispatch({
      type: LOGGED,
      payload: decoded,
    });
    await dispatch({
      type: CLEAN_ERRORS,
    });
  } catch (err) {
    await dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const logOutUser = () => async (dispatch) => {
  localStorage.removeItem('token');
  setAuthToken(false);
  await dispatch({
    type: LOGGED,
    payload: {},
  });
};
