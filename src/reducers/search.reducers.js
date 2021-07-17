import { SEARCH_POSTS, SEARCH_COMMENTS } from '../constants/search.constants';

export const searchReducer = (state = '', action) => {
  switch (action.type) {
    case SEARCH_POSTS:
      return {
        ...state,
        searchPosts: action.payload,
      };

    case SEARCH_COMMENTS:
      return {
        ...state,
        searchComments: action.payload,
      };

    default:
      return state;
  }
};
