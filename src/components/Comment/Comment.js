import React from 'react';
import { Link } from 'react-router-dom';
import './comment.css';
import Heart from '../Heart';
import PostIcon from '../../assets/postIcon.svg';
import TrashIcon from '../../assets/trashIcon.svg';

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
          className='comment__options-container'
          onClick={() => handleCommentLike(comment.like, comment)}
        >
          <span className='comment__like-label'>
            {comment.like ? 'Lubisz!' : 'Zareaguj'}
          </span>
          <div className='comment__like-icon'>
            <Heart toggle={comment.like} />
          </div>
        </div>
      ) : (
        <div className='comment__options-container'>
          <Link to={`article/${comment.postId}`}>
            <div className='comment__post-container'>
              <span className='comment__post-label'>Post</span>
              <div className='comment__post-icon-container'>
                <img className='comment__post-icon' src={PostIcon} />
              </div>
            </div>
          </Link>

          <div
            onClick={() => handleRemove(comment)}
            className='comment__trash-container'
          >
            <span className='comment__trash-label'>Usuń</span>
            <div className='comment__trash-icon-container'>
              <img className='comment__trash-icon' src={TrashIcon} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
