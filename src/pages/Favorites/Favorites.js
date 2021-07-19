import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { removeFavoritePost } from '../../actions/posts.actions';
import { removeFavoriteComment } from '../../actions/comments.actions';
import SearchBar from '../../components/SearchBar';
import Comment from '../../components/Comment';
import SneakPeek from '../../components/SneakPeek';
import Container from '../../components/Container';
import './favorites.css';

const Favorites = () => {
  let { favoritePosts } = useSelector((state) => state.favoritePostsState);
  let { favoriteComments } = useSelector(
    (state) => state.favoriteCommentsState
  );
  const { searchPosts, searchComments } = useSelector(
    (state) => state.searchState
  );

  const dispatch = useDispatch();

  const handleRemoveFavoritePost = (post) => {
    dispatch(removeFavoritePost({ post }));
  };

  const handleRemoveFavoriteComment = (comment) => {
    dispatch(removeFavoriteComment({ comment }));
  };

  favoritePosts = favoritePosts.filter((post) =>
    post.title.toLowerCase().includes(searchPosts)
  );

  favoriteComments = favoriteComments.filter((comment) =>
    comment.email.toLowerCase().includes(searchComments)
  );

  return (
    <div>
      <h3 className='favorites__header'>
        Ulubione posty ({favoritePosts.length})
      </h3>
      <div className='favorites__search-bar-container'>
        <SearchBar posts />
      </div>
      <Container>
        {favoritePosts.map((post) => (
          <SneakPeek
            favorites
            key={post.id}
            post={post}
            handleRemove={handleRemoveFavoritePost}
          />
        ))}
      </Container>
      <h3 className='favorites__header'>
        Ulubione komentarze ({favoriteComments.length})
      </h3>
      <div className='favorites__search-bar-container'>
        <SearchBar comments />
      </div>
      {favoriteComments.map((favoriteComment, index) => (
        <Comment
          key={index}
          comment={favoriteComment}
          handleRemove={handleRemoveFavoriteComment}
          favorite
        />
      ))}
    </div>
  );
};

export default Favorites;
