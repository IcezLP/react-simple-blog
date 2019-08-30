import axios from 'axios';
import { GET_POSTS, GET_POST, GET_ERRORS, LOADING } from '../types';

const BASE_URL = '/api/v1/post';

// Get all posts
export const getPosts = () => async (dispatch) => {
  await dispatch({
    type: LOADING,
  });

  try {
    const posts = await axios.get(BASE_URL);
    await dispatch({
      type: GET_POSTS,
      payload: posts.data,
    });
  } catch (err) {
    console.log(err);
    await dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

// Get post by slug
export const getPost = (slug) => async (dispatch) => {
  await dispatch({
    type: LOADING,
  });

  try {
    const posts = await axios.get(`${BASE_URL}/${slug}`);
    await dispatch({
      type: GET_POST,
      payload: posts.data,
    });
  } catch (err) {
    console.log(err);
    await dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

// Create new post
export const createPost = () => async (dispatch) => {};

// Update post by slug
export const updatePost = () => async (dispatch) => {};

// Delete post by id
export const deletePost = () => async (dispatch) => {};
