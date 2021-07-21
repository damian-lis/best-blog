import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  ADD_FAVORITE_POST,
  REMOVE_FAVORITE_POST
} from '/src/constants/posts.constants';
import axios from 'axios';

export const getPosts = () => async (dispatch) => {
  dispatch({ type: GET_POSTS_REQUEST });
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');

  try {
    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload: error
    });
  }
};

export const getPost = ({ id }) => async (dispatch) => {
  dispatch({ type: GET_POST_REQUEST });
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

  try {
    dispatch({
      type: GET_POST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_POST_FAIL,
      payload: error
    });
  }
};

export const addFavoritePost = ({ post }) => (dispatch, getState) => {
  dispatch({ type: ADD_FAVORITE_POST, payload: post });
  localStorage.setItem(
    'favoritePosts',
    JSON.stringify(getState().favoritePostsState.favoritePosts)
  );
};

export const removeFavoritePost = ({ post }) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FAVORITE_POST, payload: post });
  localStorage.setItem(
    'favoritePosts',
    JSON.stringify(getState().favoritePostsState.favoritePosts)
  );
};
