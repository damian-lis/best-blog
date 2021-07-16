import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { postsReducer, postReducer } from './reducers/posts.reducers';
import {
  commentsReducer,
  articleCommentsReducer,
} from './reducers/comments.reducers';

const reducer = combineReducers({
  postsState: postsReducer,
  postState: postReducer,
  commentsState: commentsReducer,
  articleCommentsState: articleCommentsReducer,
});

const initialState = {
  postsState: { posts: [], loading: false, error: null },
  postState: { post: {}, loading: false, error: null },
  commentsState: { comments: [], loading: false, error: null },
  articleCommentsState: { articleComments: [], loading: false, error: null },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
