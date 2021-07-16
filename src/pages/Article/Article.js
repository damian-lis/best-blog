import React, { useEffect } from 'react';
import { getPost } from '../../actions/posts.actions';
import { getArticleComments } from '../../actions/comments.actions';
import { useDispatch, useSelector } from 'react-redux';

const Article = ({ match, history }) => {
  const id = match.params.id;

  console.log(history);

  const dispatch = useDispatch();

  const { post, loading: postLoading, error: postError } = useSelector(
    (state) => state.postState
  );
  const {
    articleComments,
    loading: commentsLoading,
    error: errorLoading,
  } = useSelector((state) => state.articleCommentsState);

  useEffect(() => {
    dispatch(getPost({ id }));
    dispatch(getArticleComments({ id }));
  }, [dispatch]);

  return postLoading || commentsLoading ? (
    <p>Loading</p>
  ) : (
    <div>
      <h2>{post.title}</h2>
      <p style={{ backgroundColor: 'red' }}>{post.body}</p>
      {articleComments.map((articleComment) => (
        <>
          <p>{articleComment.email}</p>
          <p>{articleComment.body}</p>
        </>
      ))}
    </div>
  );
};

export default Article;
