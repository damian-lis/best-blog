import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '/src/actions/posts.actions';
import {
  getArticleComments,
  addFavoriteComment,
  removeFavoriteComment
} from '/src/actions/comments.actions';
import { Loader, Post, ErrorInfo, Headline, Container } from '/src/components';
import { Comments } from '/src/containers';
import { setElementsLike, filterElements } from '/src/helpers';

const Article = ({ match, ...restProps }) => {
  const { post, loading: postLoading, error: postError } = useSelector((state) => state.postState);
  const {
    articleComments,
    loading: commentsLoading,
    error: commentsError
  } = useSelector((state) => state.articleCommentsState);
  const { searchComments } = useSelector((state) => state.searchState);
  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const { favoriteComments } = useSelector((state) => state.favoriteCommentsState);
  const dispatch = useDispatch();
  const id = Number(match.params.id);

  const filteredComments = filterElements(articleComments, 'email', searchComments);

  const commentsWithLikes = setElementsLike(post, filteredComments, favoriteComments);

  const handleRemoveFavoriteComment = (comment) => {
    dispatch(removeFavoriteComment({ comment }));
  };

  const handleAddFavoriteComment = (comment) => {
    dispatch(addFavoriteComment({ comment }));
  };

  useEffect(() => {
    dispatch(getPost({ id }));
    dispatch(getArticleComments({ id }));
  }, [dispatch]);

  return postLoading ? (
    <Loader />
  ) : postError ? (
    <ErrorInfo />
  ) : (
    <Container {...restProps} base>
      <Post post={post} favoritePosts={favoritePosts} />
      <Headline> Komentarze ({commentsWithLikes.length})</Headline>
      {commentsLoading ? (
        <Loader />
      ) : commentsError ? (
        <ErrorInfo />
      ) : (
        <Comments
          selectOption
          data={commentsWithLikes}
          initialQuantity={5}
          removeFromFavorite={handleRemoveFavoriteComment}
          addToFavorite={handleAddFavoriteComment}
        />
      )}
    </Container>
  );
};

export default Article;
