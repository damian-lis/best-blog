import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavoritePost } from '../../actions/posts.actions';
import { removeFavoriteComment } from '../../actions/comments.actions';
import { SearchBar, Headline, Container, Line } from '../../components';
import { Comments, PostSneakPeeks } from '../../containers';
import { filterElements } from '../../helpers';

const Favorites = () => {
  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const { favoriteComments } = useSelector((state) => state.favoriteCommentsState);
  const { searchPosts, searchComments } = useSelector((state) => state.searchState);

  const dispatch = useDispatch();

  const handleRemoveFavoritePost = (post) => {
    dispatch(removeFavoritePost({ post }));
  };

  const handleRemoveFavoriteComment = (comment) => {
    dispatch(removeFavoriteComment({ comment }));
  };

  const filteredFavoritePosts = filterElements(favoritePosts, 'title', searchPosts);

  const filteredFavoriteComments = filterElements(favoriteComments, 'email', searchComments);

  return (
    <Container base>
      {favoritePosts.length ? (
        <Container base>
          <Headline>Ulubione posty ({favoritePosts.length})</Headline>
          <Container style={{ marginBottom: 40 }}>
            <SearchBar posts />
          </Container>
          <PostSneakPeeks
            favoritesPage
            initialQuantity={5}
            posts={filteredFavoritePosts}
            removePost={handleRemoveFavoritePost}
          />
        </Container>
      ) : (
        <Headline>Nie masz ulubionych postów</Headline>
      )}

      <Line />

      {favoriteComments.length ? (
        <Container base>
          <Headline> Ulubione komentarze ({favoriteComments.length})</Headline>
          <Comments
            favoritePage
            data={filteredFavoriteComments}
            initialQuantity={5}
            removeFromFavorite={handleRemoveFavoriteComment}
          />
        </Container>
      ) : (
        <Headline>Nie masz ulubionych komentarzy</Headline>
      )}
    </Container>
  );
};

export default Favorites;
