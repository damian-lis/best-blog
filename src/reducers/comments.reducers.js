import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  GET_POST_COMMENTS_REQUEST,
  GET_POST_COMMENTS_SUCCESS,
  GET_POST_COMMENTS_FAIL,
  ADD_FAVORITE_COMMENT,
  REMOVE_FAVORITE_COMMENT
} from '/src/constants/comments.constants';

export const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload
      };
    case GET_COMMENTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCommentsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_POST_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        postComments: action.payload
      };
    case GET_POST_COMMENTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const favoriteCommentsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FAVORITE_COMMENT:
      const commentExist = state.favoriteComments.some(
        (favoriteComment) => favoriteComment.id === action.payload.id
      );

      return {
        ...state,
        favoriteComments: !commentExist
          ? [...state.favoriteComments, action.payload]
          : state.favoriteComments
      };
    case REMOVE_FAVORITE_COMMENT:
      return {
        ...state,
        favoriteComments: state.favoriteComments.filter(
          (comment) => comment.id !== action.payload.id
        )
      };

    default:
      return state;
  }
};
