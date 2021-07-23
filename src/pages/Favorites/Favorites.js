import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavoritePost } from '/src/actions/posts.actions';
import { removeFavoriteComment } from '/src/actions/comments.actions';
import { Comments, PostSneakPeeks } from '/src/containers';
import { Container, Headline, Line } from '/src/components';

const Favorites = () => {
  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const { favoriteComments } = useSelector((state) => state.favoriteCommentsState);

  const dispatch = useDispatch();

  const handleRemoveFavoritePost = (post) => {
    dispatch(removeFavoritePost(post));
  };

  const handleRemoveFavoriteComment = (comment) => {
    dispatch(removeFavoriteComment(comment));
  };

  return (
    <Container base>
      {favoritePosts.length ? (
        <Container base>
          <Headline>Ulubione posty ({favoritePosts.length})</Headline>
          <PostSneakPeeks
            isFavoritesPage
            initialQuantity={5}
            posts={favoritePosts}
            removeFavoritePost={handleRemoveFavoritePost}
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
            isFavoritesPage
            data={favoriteComments}
            initialQuantity={5}
            removeFavoriteComment={handleRemoveFavoriteComment}
          />
        </Container>
      ) : (
        <Headline>Nie masz ulubionych komentarzy</Headline>
      )}
    </Container>
  );
};

export default Favorites;
