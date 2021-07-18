import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFavoritePost } from '../../actions/posts.actions';
import { removeFavoriteComment } from '../../actions/comments.actions';
import SearchBar from '../../components/SearchBar';

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
      <h3>Ulubione posty</h3>
      <SearchBar posts />
      {favoritePosts.map((favoritePost, index) => (
        <div key={index} style={{ margin: 20 }}>
          <p>{favoritePost.title}</p>
          <p>{favoritePost.name}</p>
          <p>{favoritePost.body}</p>
          <p onClick={() => handleRemoveFavoritePost(favoritePost)}>Usuń</p>
          <Link to={`article/${favoritePost.id}`}>Przejdź do tego postu</Link>
        </div>
      ))}
      <h3>Ulubione komentarze</h3>
      <SearchBar comments />
      {favoriteComments.map((favoriteComment, index) => (
        <div key={index} style={{ margin: 20 }}>
          <p>{favoriteComment.email}</p>
          <p>{favoriteComment.body}</p>
          <p onClick={() => handleRemoveFavoriteComment(favoriteComment)}>
            Usuń
          </p>
          <Link to={`article/${favoriteComment.postId}`}>
            Przejdź do postu z tym komentarzem
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
