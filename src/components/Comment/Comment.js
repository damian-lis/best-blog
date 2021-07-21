import React from 'react';
import { Link } from 'react-router-dom';
import DynamicIcon from '../DynamicIcon';
import PostIcon from '../../assets/postIcon.svg';
import TrashIcon from '../../assets/trashIcon.svg';
import GrayHeartIcon from '../../assets/grayHeartIcon.svg';
import HeartIcon from '../../assets/heartIcon.svg';
import './comment.css';

const Comment = ({
  favoritePage,
  comment,
  removeLike,
  addLike,
  ...restProps
}) => {
  const handleToggleLike = (commentIsLiked, comment) => {
    commentIsLiked ? removeLike(comment) : addLike(comment);
  };

  return (
    <div className='comment' {...restProps}>
      <p className='comment__email'>{comment.email}</p>
      <p className='comment__body'>{comment.body}</p>
      <div className='comment__options'>
        {favoritePage && (
          <Link to={`article/${comment.postId}`}>
            <div className='comment__option'>
              <DynamicIcon link medium label='Post' src={PostIcon} />
            </div>
          </Link>
        )}
        <div
          onClick={() => handleToggleLike(comment.like, comment)}
          className='comment__option'
        >
          {favoritePage ? (
            <DynamicIcon link medium label='Usuń' src={TrashIcon} />
          ) : (
            <DynamicIcon
              link
              small
              toggle={comment.like}
              srcTrue={HeartIcon}
              srcFalse={GrayHeartIcon}
              label={comment.like ? 'Lubisz!' : 'Zareaguj'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
