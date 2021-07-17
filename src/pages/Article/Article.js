import React, { useEffect } from 'react';
import {
  getPost,
  addFavoritePost,
  removeFavoritePost,
} from '../../actions/posts.actions';
import {
  getArticleComments,
  addFavoriteComment,
  removeFavoriteComment,
} from '../../actions/comments.actions';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/Search';

const Article = ({ match, history }) => {
  const id = Number(match.params.id);

  console.log(history);

  const dispatch = useDispatch();

  const { post, loading: postLoading, error: postError } = useSelector(
    (state) => state.postState
  );
  let {
    articleComments,
    loading: commentsLoading,
    error: errorLoading,
  } = useSelector((state) => state.articleCommentsState);
  const { searchComments } = useSelector((state) => state.searchState);

  articleComments = articleComments.filter((comment) =>
    comment.email.toLowerCase().includes(searchComments)
  );

  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const { favoriteComments } = useSelector(
    (state) => state.favoriteCommentsState
  );

  const postIsLiked = favoritePosts.some(
    (favoritePost) => favoritePost.id === post.id
  );

  const toggleFavoritePost = () => {
    dispatch(
      postIsLiked ? removeFavoritePost({ post }) : addFavoritePost({ post })
    );
  };

  const toggleFavoriteComment = (commentIsLiked, articleComment) => {
    dispatch(
      commentIsLiked
        ? removeFavoriteComment({ comment: articleComment })
        : addFavoriteComment({ comment: articleComment })
    );
  };

  useEffect(() => {
    dispatch(getPost({ id }));
    dispatch(getArticleComments({ id }));
  }, [dispatch]);

  return postLoading || commentsLoading ? (
    <p>Loading</p>
  ) : (
    <div>
      <h2 onClick={toggleFavoritePost}>
        {post.title} {postIsLiked && 'Lubisz to!'}
      </h2>
      <p style={{ backgroundColor: 'red' }}>{post.body}</p>
      <h2>Komentarze</h2>
      <Search comments />
      {articleComments.map((articleComment, index) => {
        const commentIsLiked = favoriteComments.some(
          (favoriteComment) => favoriteComment.id === articleComment.id
        );

        return (
          <div
            onClick={() =>
              toggleFavoriteComment(commentIsLiked, articleComment)
            }
            key={index}
          >
            <p>{articleComment.email}</p>
            <p>{articleComment.body}</p>
            <p>{commentIsLiked && 'Lubisz to!'}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Article;
