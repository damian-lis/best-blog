import { SEARCH_POSTS, SEARCH_COMMENTS } from '/src/constants/search.constants';

export const searchPosts = (word) => (dispatch) => {
  dispatch({ type: SEARCH_POSTS, payload: word });
};

export const searchComments = (word) => (dispatch) => {
  dispatch({ type: SEARCH_COMMENTS, payload: word });
};
