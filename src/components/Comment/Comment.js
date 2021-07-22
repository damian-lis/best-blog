import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DynamicIcon } from '/src/components';
import { postIcon, trashIcon, grayHeartIcon, heartIcon } from '/src/assets';
import styles from './comment.module.css';

const Comment = ({
  isFavoritesPage,
  isFavoriteComment,
  data = {},
  removeFavoriteComment = () => {},
  addFavoriteComment = () => {},
  ...restProps
}) => {
  const handleFavoriteComment = () => {
    isFavoriteComment ? removeFavoriteComment(data) : addFavoriteComment(data);
  };

  return (
    <div className={styles.comment} {...restProps}>
      <p className={styles.comment__email}>{data.email}</p>
      <p className={styles.comment__body}>{data.body}</p>
      <div className={styles.comment__options}>
        {isFavoritesPage && (
          <Link to={`article/${data.postId}`}>
            <div className={styles.comment__option}>
              <DynamicIcon asLink imgMedium label="Post" src={postIcon} />
            </div>
          </Link>
        )}
        <div onClick={handleFavoriteComment} className={styles.comment__option}>
          {isFavoritesPage ? (
            <DynamicIcon asLink imgMedium label="Usuń" src={trashIcon} />
          ) : (
            <DynamicIcon
              asLink
              imgSmall
              toggleValue={isFavoriteComment}
              toggleTrueSrc={heartIcon}
              toggleFalseSrc={grayHeartIcon}
              label={isFavoriteComment ? 'Lubisz!' : 'Zareaguj'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  isFavoritePage: PropTypes.bool,
  data: PropTypes.object.isRequired,
  removeFavoriteComment: PropTypes.func,
  addFavoriteComment: PropTypes.func
};

export default Comment;
