import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { postsReducer, postReducer, favoritePostsReducer } from './reducers/posts.reducers';
import {
  commentsReducer,
  articleCommentsReducer,
  favoriteCommentsReducer
} from './reducers/comments.reducers';
import { searchReducer } from './reducers/search.reducers';

const reducer = combineReducers({
  postsState: postsReducer,
  postState: postReducer,
  commentsState: commentsReducer,
  articleCommentsState: articleCommentsReducer,
  favoritePostsState: favoritePostsReducer,
  favoriteCommentsState: favoriteCommentsReducer,
  searchState: searchReducer
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
  articleCommentsState: { articleComments: [], loading: false, error: null },
  favoritePostsState: { favoritePosts },
  favoriteCommentsState: { favoriteComments },
  searchState: { searchPosts: '', searchComments: '' }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
