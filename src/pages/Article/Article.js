import React, { useEffect, useState } from 'react';
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

const Article = ({ match }) => {
  const id = Number(match.params.id);

  const [selectedOption, setSelectedOption] = useState('all');

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

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  let modifiedComments = articleComments.map((articleComment) => {
    const isCommentLiked = favoriteComments.some(
      (favoriteComment) =>
        favoriteComment.postId === post.id &&
        favoriteComment.id === articleComment.id
    );

    if (isCommentLiked) {
      articleComment.like = true;
    } else {
      articleComment.like = false;
    }

    return articleComment;
  });

  if (selectedOption === 'liked') {
    modifiedComments = modifiedComments.filter(
      (modifiedComment) => modifiedComment.like
    );
  }

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
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        name='pets'
        id='pet-select'
      >
        <option value='all'>Wszystkie komentarze</option>
        <option value='liked'>Polubione komentarze</option>
      </select>
      {modifiedComments.map((comment, index) => {
        console.log(comment);
        return (
          <div
            onClick={() => toggleFavoriteComment(comment.like, comment)}
            key={index}
          >
            <p>{comment.email}</p>
            <p>{comment.body}</p>
            <p>{comment.like && 'Lubisz to!'}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Article;
