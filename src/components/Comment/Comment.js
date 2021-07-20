import React from 'react';
import { Link } from 'react-router-dom';
import './comment.css';
import DynamicIcon from '../DynamicIcon';
import PostIcon from '../../assets/postIcon.svg';
import TrashIcon from '../../assets/trashIcon.svg';
import GrayHeartIcon from '../../assets/grayHeartIcon.svg';
import HeartIcon from '../../assets/heartIcon.svg';

const Comment = ({
  favorite,
  comment,
  handleCommentLike,
  handleRemove,
  ...restProps
}) => {
  return (
    <div className='comment' {...restProps}>
      <p className='comment__email'>{comment.email}</p>
      <p className='comment__body'>{comment.body}</p>
      {!favorite ? (
        <div
          className='comment__options'
          onClick={() => handleCommentLike(comment.like, comment)}
        >
          <div className='comment__option'>
            <DynamicIcon
              link
              small
              toggle={comment.like}
              srcTrue={HeartIcon}
              srcFalse={GrayHeartIcon}
              label={comment.like ? 'Lubisz!' : 'Zareaguj'}
            />
          </div>
        </div>
      ) : (
        <div className='comment__options'>
          <Link to={`article/${comment.postId}`}>
            <div className='comment__option'>
              <DynamicIcon link medium label='Post' src={PostIcon} />
            </div>
          </Link>

          <div
            onClick={() => handleRemove(comment)}
            className='comment__option'
          >
            <DynamicIcon link medium label='Usuń' src={TrashIcon} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
