import React from 'react';
import { useDispatch } from 'react-redux';
import SneakPeekImg from '../../assets/sneakPeek.svg';
import DynamicIcon from '../../components/DynamicIcon';
import GrayHeartIcon from '../../assets/grayHeartIcon.svg';
import HeartIcon from '../../assets/heartIcon.svg';
import {
  addFavoritePost,
  removeFavoritePost,
} from '../../actions/posts.actions';
import './post.css';

const Post = ({ post, favoritePosts }) => {
  const postIsLiked = favoritePosts.some(
    (favoritePost) => favoritePost.id === post.id
  );

  const dispatch = useDispatch();

  const handleTogglePostLike = () => {
    dispatch(
      postIsLiked ? removeFavoritePost({ post }) : addFavoritePost({ post })
    );
  };
  return (
    <div className='post'>
      <div className='post__img-container'>
        <img src={SneakPeekImg} className='post__img' />
      </div>
      <h2 className='post__title'>{post.title}</h2>
      <p>{post.body}</p>
      <p>{post.body}</p>
      <p>{post.body}</p>
      <p>{post.body}</p>
      <p>{post.body}</p>
      <p>{post.body}</p>
      <p>{post.body}</p>
      <p>{post.body}</p>
      <div className='post__icon-container' onClick={handleTogglePostLike}>
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
  );
};

export default Post;
