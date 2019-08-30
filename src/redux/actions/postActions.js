import axios from 'axios';
import { GET_POSTS, GET_ERRORS } from '../types';

const BASE_URL = '/api/v1/post';

// Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const posts = await axios.get(BASE_URL);
    await dispatch({
      type: GET_POSTS,
      payload: posts.data,
    });
  } catch (err) {
    await dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get post by slug
export const getPost = () => async (dispatch) => {};

// Create new post
export const createPost = () => async (dispatch) => {};

// Update post by slug
export const updatePost = () => async (dispatch) => {};

// Delete post by id
export const deletePost = () => async (dispatch) => {};
