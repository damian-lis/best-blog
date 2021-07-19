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
            <span className='comment__option-label'>
              {comment.like ? 'Lubisz!' : 'Zareaguj'}
            </span>
            <div className='comment__option-icon'>
              <DynamicIcon
                toggle={comment.like}
                srcTrue={HeartIcon}
                srcFalse={GrayHeartIcon}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className='comment__options'>
          <Link to={`article/${comment.postId}`}>
            <div className='comment__option'>
              <span className='comment__option-label'>Post</span>
              <div className='comment__option-icon'>
                <DynamicIcon src={PostIcon} />
              </div>
            </div>
          </Link>

          <div
            onClick={() => handleRemove(comment)}
            className='comment__option'
          >
            <span className='comment__option-label'>Usuń</span>
            <div className='comment__option-icon'>
              <DynamicIcon src={TrashIcon} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
