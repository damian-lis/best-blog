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

export const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      };
    case GET_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload
      };
    case GET_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const favoritePostsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FAVORITE_POST:
      const postExist = state.favoritePosts.some(
        (favoritePost) => favoritePost.id === action.payload.id
      );

      return {
        ...state,
        favoritePosts: !postExist ? [...state.favoritePosts, action.payload] : state.favoritePosts
      };
    case REMOVE_FAVORITE_POST:
      return {
        ...state,
        favoritePosts: state.favoritePosts.filter((post) => post.id !== action.payload.id)
      };

    default:
      return state;
  }
};
