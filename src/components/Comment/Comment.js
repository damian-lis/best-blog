import React from 'react';
import './comment.css';
import Heart from '../Heart';

const Comment = ({ comment, handleCommentLike, ...restProps }) => {
  return (
    <div className='comment' {...restProps}>
      <p className='comment__email'>{comment.email}</p>
      <p className='comment__body'>{comment.body}</p>
      <div
        className='comment__like-container'
        onClick={() => handleCommentLike(comment.like, comment)}
      >
        <span className='comment__like-label'>
          {comment.like ? 'Lubisz!' : 'Zareaguj'}
        </span>
        <div className='comment__like-icon'>
          <Heart toggle={comment.like} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
