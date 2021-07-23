import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { postsReducer, postReducer, favoritePostsReducer } from './reducers/posts.reducers';
import {
  commentsReducer,
  postCommentsReducer,
  favoriteCommentsReducer
} from './reducers/comments.reducers';
import { searchWordReducer } from './reducers/searchWord.reducers';

const reducer = combineReducers({
  postsState: postsReducer,
  postState: postReducer,
  commentsState: commentsReducer,
  postCommentsState: postCommentsReducer,
  favoritePostsState: favoritePostsReducer,
  favoriteCommentsState: favoriteCommentsReducer,
  searchWordState: searchWordReducer
});

const favoritePosts = localStorage.getItem('favoritePosts')
  ? JSON.parse(localStorage.getItem('favoritePosts'))
  : [];

const favoriteComments = localStorage.getItem('favoriteComments')
  ? JSON.parse(localStorage.getItem('favoriteComments'))
  : [];

const initialState = {
  postsState: { posts: [], loading: false, error: null },
  postState: { post: {}, loading: false, error: null },
  commentsState: { comments: [], loading: false, error: null },
  postCommentsState: { postComments: [], loading: false, error: null },
  favoritePostsState: { favoritePosts },
  favoriteCommentsState: { favoriteComments },
  searchWordState: { searchWord: '' }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
