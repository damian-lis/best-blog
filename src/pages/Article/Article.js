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
import SearchBar from '../../components/SearchBar';
import SneakPeekImg from '../../assets/sneakPeek.svg';
import './article.css';
import DynamicIcon from '../../components/DynamicIcon';
import Comment from '../../components/Comment';
import GrayHeartIcon from '../../assets/grayHeartIcon.svg';
import HeartIcon from '../../assets/heartIcon.svg';
import QuantityChanger from '../../components/QuantityChanger';
import Loader from '../../components/Loader';

const Article = ({ match }) => {
  const [commentsQuantity, setCommentsQuantity] = useState(3);
  const [selectedOption, setSelectedOption] = useState('all');
  const { post, loading: postLoading, error: postError } = useSelector(
    (state) => state.postState
  );
  let {
    articleComments,
    loading: commentsLoading,
    error: commentsError,
  } = useSelector((state) => state.articleCommentsState);
  const { searchComments } = useSelector((state) => state.searchState);
  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const { favoriteComments } = useSelector(
    (state) => state.favoriteCommentsState
  );

  const id = Number(match.params.id);
  const dispatch = useDispatch();

  const filteredComments = articleComments.filter((comment) =>
    comment.email.toLowerCase().includes(searchComments.toLowerCase())
  );

  const postIsLiked = favoritePosts.some(
    (favoritePost) => favoritePost.id === post.id
  );

  let modifiedComments = filteredComments.map((comment) => {
    const isCommentLiked = favoriteComments.some(
      (favoriteComment) =>
        favoriteComment.postId === post.id && favoriteComment.id === comment.id
    );

    if (isCommentLiked) {
      comment.like = true;
    } else {
      comment.like = false;
    }

    return comment;
  });

  if (selectedOption === 'liked') {
    modifiedComments = modifiedComments.filter(
      (modifiedComment) => modifiedComment.like
    );
  }

  if (selectedOption === 'unliked') {
    modifiedComments = modifiedComments.filter(
      (modifiedComment) => !modifiedComment.like
    );
  }

  const reducedComments = modifiedComments.slice(0, commentsQuantity);

  const countQuantity =
    commentsQuantity > modifiedComments.length
      ? modifiedComments.length
      : commentsQuantity;

  const handleTogglePostLike = () => {
    dispatch(
      postIsLiked ? removeFavoritePost({ post }) : addFavoritePost({ post })
    );
  };

  const handleToggleCommentLike = (commentIsLiked, comment) => {
    dispatch(
      commentIsLiked
        ? removeFavoriteComment({ comment })
        : addFavoriteComment({ comment })
    );
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    dispatch(getPost({ id }));
    dispatch(getArticleComments({ id }));
  }, [dispatch]);

  return postLoading ? (
    <Loader />
  ) : postError ? (
    <>
      <p style={{ textAlign: 'center', lineHeight: 2 }}>
        Coś poszło nie tak z ładowaniem posta... <br />
        Załaduj stronę jeszcze raz!
      </p>
    </>
  ) : (
    <div className='article'>
      <div className='article__img-container'>
        <img src={SneakPeekImg} className='article__img' />
      </div>
      <h2 className='article__title'>{post.title}</h2>
      <p>{post.body}</p>
      <p>{post.body}</p>
      <p>{post.body}</p>
      <p>{post.body}</p>
      <p>{post.body}</p>
      <p>{post.body}</p>
      <p>{post.body}</p>
      <p>{post.body}</p>
      <div className='article__react-container' onClick={handleTogglePostLike}>
        <div className='article__react-icon-container'>
          <DynamicIcon
            toggle={postIsLiked}
            srcTrue={HeartIcon}
            srcFalse={GrayHeartIcon}
            small
            link
            label={postIsLiked ? 'Lubisz!' : 'Zareaguj'}
          />
        </div>
      </div>
      <h3 className='article__header'>
        Komentarze ({modifiedComments.length})
      </h3>
      {commentsLoading ? (
        <Loader />
      ) : commentsError ? (
        <>
          <p style={{ textAlign: 'center', lineHeight: 2 }}>
            Coś poszło nie tak z ładowaniem komentarzy... <br />
            Załaduj stronę jeszcze raz!
          </p>
        </>
      ) : (
        <div>
          <div className='article__comments-options'>
            <SearchBar comments small />
            <select
              className='article__comments-select'
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value='all'>Wszystkie komentarze</option>
              <option value='liked'>Polubione komentarze</option>
              <option value='unliked'>Niepolubione komentarze</option>
            </select>
          </div>
          <div className='article__comments-container'>
            {reducedComments.map((comment, index) => (
              <Comment
                handleCommentLike={handleToggleCommentLike}
                key={index}
                comment={comment}
              />
            ))}
          </div>
          <QuantityChanger
            rangeSize={1}
            maxSize={modifiedComments.length}
            quantity={countQuantity}
            setQuantity={setCommentsQuantity}
          />
        </div>
      )}
    </div>
  );
};

export default Article;
