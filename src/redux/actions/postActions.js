import axios from 'axios';
import {
  GET_POSTS,
  GET_POST,
  GET_ERRORS,
  LOADING_POSTS,
  LOADING_POST,
  CLEAN_ERRORS,
  DELETE_POST,
  CREATING_POST,
  ADD_POST,
  UPDATING_POST,
  UPDATE_POST,
  DELETING_POST,
} from '../types';

const BASE_URL = '/api/v1/post';

// Get all posts
export const getPosts = () => async (dispatch) => {
  await dispatch({
    type: LOADING_POSTS,
  });

  try {
    const posts = await axios.get(BASE_URL);
    await dispatch({
      type: GET_POSTS,
      payload: posts.data,
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

// Get post by slug
export const getPost = (slug) => async (dispatch) => {
  await dispatch({
    type: LOADING_POST,
  });

  try {
    const posts = await axios.get(`${BASE_URL}/${slug}`);
    await dispatch({
      type: GET_POST,
      payload: posts.data,
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

// Create new post
export const createPost = (data) => async (dispatch) => {
  await dispatch({
    type: CREATING_POST,
  });

  try {
    const response = await axios.post(BASE_URL, data);
    await dispatch({
      type: ADD_POST,
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

// Update post by slug
export const updatePost = (slug, data) => async (dispatch) => {
  await dispatch({
    type: UPDATING_POST,
  });

  try {
    const response = await axios.put(`${BASE_URL}/${slug}`, data);
    await dispatch({
      type: UPDATE_POST,
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

// Delete post by id
export const deletePost = (id) => async (dispatch) => {
  await dispatch({
    type: DELETING_POST,
  });

  try {
    await axios.delete(`${BASE_URL}/${id}`);
    await dispatch({
      type: DELETE_POST,
      payload: id,
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
