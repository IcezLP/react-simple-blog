import {
  GET_POSTS,
  LOADING_POSTS,
  LOADING_POST,
  GET_POST,
  GET_ERRORS,
  DELETE_POST,
  CREATING_POST,
  ADD_POST,
  UPDATING_POST,
  UPDATE_POST,
  DELETING_POST,
} from '../types';

const initialState = {
  posts: [],
  post: {},
  successCreated: false,
  successUpdated: false,
  successDeleted: false,
  loadingPosts: false,
  loadingPost: false,
  deletingPost: false,
  creatingPost: false,
  updatingPost: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_POSTS:
      return {
        ...state,
        loadingPosts: true,
      };
    case LOADING_POST:
      return {
        ...state,
        loadingPost: true,
      };
    case CREATING_POST:
      return {
        ...state,
        creatingPost: true,
        successCreated: false,
      };
    case UPDATING_POST:
      return {
        ...state,
        updatingPost: true,
        successUpdated: false,
      };
    case DELETING_POST:
      return {
        ...state,
        deletingPost: true,
        successDeleted: false,
      };
    case GET_ERRORS:
      return {
        ...state,
        loadingPosts: false,
        loadingPost: false,
        creatingPost: false,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loadingPosts: false,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loadingPost: false,
      };
    case ADD_POST:
      return {
        ...state,
        successCreated: true,
        creatingPost: false,
      };
    case UPDATE_POST:
      return {
        ...state,
        successUpdated: true,
        updatingPost: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        successDeleted: true,
        deletingPost: false,
      };
    default:
      return state;
  }
};
