import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  GET_ARTICLE_COMMENTS_REQUEST,
  GET_ARTICLE_COMMENTS_SUCCESS,
  GET_ARTICLE_COMMENTS_FAIL,
} from '../constants/comments.constants';
import axios from 'axios';

export const getComments = () => async (dispatch) => {
  dispatch({ type: GET_COMMENTS_REQUEST });
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/comments`
  );

  try {
    dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COMMENTS_FAIL,
      payload: error,
    });
  }
};

export const getArticleComments = ({ id }) => async (dispatch) => {
  dispatch({ type: GET_ARTICLE_COMMENTS_REQUEST });
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );

  try {
    dispatch({
      type: GET_ARTICLE_COMMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ARTICLE_COMMENTS_FAIL,
      payload: error,
    });
  }
};
