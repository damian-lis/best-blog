import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '/src/actions/posts.actions';
import {
  getPostComments,
  addFavoriteComment,
  removeFavoriteComment
} from '/src/actions/comments.actions';
import { Loader, Post, ErrorInfo, Headline, Container, Line } from '/src/components';
import { Comments } from '/src/containers';
import { filterElements } from '/src/helpers';

const Article = ({ match }) => {
  const {
    post,
    loading: isPostLoading,
    error: isPostError
  } = useSelector((state) => state.postState);
  const {
    postComments,
    loading: isPostCommentsLoading,
    error: isPostCommentsError
  } = useSelector((state) => state.postCommentsState);

  const dispatch = useDispatch();
  const id = Number(match.params.id);

  const handleRemoveFavoriteComment = (comment) => {
    dispatch(removeFavoriteComment(comment));
  };

  const handleAddFavoriteComment = (comment) => {
    dispatch(addFavoriteComment(comment));
  };

  useEffect(() => {
    dispatch(getPost(id));
    dispatch(getPostComments(id));
  }, [dispatch, id]);

  return isPostLoading ? (
    <Loader />
  ) : isPostError ? (
    <ErrorInfo />
  ) : (
    <Container base>
      <Post data={post} />
      {/* <Headline> Komentarze ({filteredComments.length})</Headline>
      <Line /> */}
      {isPostCommentsLoading ? (
        <Loader />
      ) : isPostCommentsError ? (
        <ErrorInfo />
      ) : (
        <Comments
          withSelectOption
          data={postComments}
          initialQuantity={5}
          removeFavoriteComment={handleRemoveFavoriteComment}
          addFavoriteComment={handleAddFavoriteComment}
        />
      )}
    </Container>
  );
};

export default Article;
