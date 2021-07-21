import React from 'react';
import { Link } from 'react-router-dom';
import { DynamicIcon } from '../../components';
import { postIcon, trashIcon, grayHeartIcon, heartIcon } from '../../assets';
import styles from './comment.module.css';

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
    <div className={styles.comment} {...restProps}>
      <p className={styles.comment__email}>{comment.email}</p>
      <p className={styles.comment__body}>{comment.body}</p>
      <div className={styles.comment__options}>
        {favoritePage && (
          <Link to={`article/${comment.postId}`}>
            <div className={styles.comment__option}>
              <DynamicIcon link medium label='Post' src={postIcon} />
            </div>
          </Link>
        )}
        <div
          onClick={() => handleToggleLike(comment.like, comment)}
          className={styles.comment__option}
        >
          {favoritePage ? (
            <DynamicIcon link medium label='Usuń' src={trashIcon} />
          ) : (
            <DynamicIcon
              link
              small
              toggle={comment.like}
              srcTrue={heartIcon}
              srcFalse={grayHeartIcon}
              label={comment.like ? 'Lubisz!' : 'Zareaguj'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
