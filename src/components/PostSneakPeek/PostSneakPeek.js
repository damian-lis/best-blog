import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DynamicIcon } from '/src/components';
import { trashIcon, heartIcon, chatBubbleIcon, postSneakPeekImg } from '/src/assets';
import styles from './postSneakPeek.module.css';

const PostSneakPeek = ({
  post = {},
  favoritesPage,
  comments = [],
  favoritePosts = [],
  favoriteComments = [],
  removePost = () => {},
  ...restProps
}) => {
  const postComments = comments.filter((comment) => comment.postId === post.id);
  const postCommentsLiked = favoriteComments.filter((comment) => comment.postId === post.id);
  const isPostLiked = favoritePosts.some((favoritePost) => favoritePost.id === post.id);

  return (
    <div {...restProps} className={styles.postSneakPeek}>
      {isPostLiked && (
        <div
          className={`${styles.postSneakPeek__iconContainer} ${styles['postSneakPeek__iconContainer--attached']}`}>
          <DynamicIcon imgSmall src={heartIcon} />
        </div>
      )}
      <div className={styles.postSneakPeek__imgContainer}>
        <img className={styles.postSneakPeek__img} alt="postSneakPeekImg" src={postSneakPeekImg} />
      </div>
      <h3 className={styles.postSneakPeek__title}>{post.title}</h3>
      <div className={styles.postSneakPeek__stats}>
        <Link className={styles.postSneakPeek__link} to={`article/${post.id}`}>
          Zobacz post
        </Link>
        {!favoritesPage && postComments.length && (
          <>
            <div className={styles.postSneakPeek__iconContainer}>
              <DynamicIcon
                imgMedium
                src={chatBubbleIcon}
                number={postComments.length}
                label="Komentarze"
              />
            </div>
            <div className={styles.postSneakPeek__iconContainer}>
              <DynamicIcon
                imgMedium
                src={heartIcon}
                number={postCommentsLiked.length}
                label="Polubione"
              />
            </div>
          </>
        )}
        {favoritesPage && (
          <div onClick={() => removePost(post)} className={styles.postSneakPeek__iconContainer}>
            <DynamicIcon link imgMedium label="Usuń" src={trashIcon} />
          </div>
        )}
      </div>
    </div>
  );
};

PostSneakPeek.propTypes = {
  post: PropTypes.object.isRequired,
  favoritesPage: PropTypes.bool,
  comments: PropTypes.array,
  favoritePosts: PropTypes.array,
  favoriteComments: PropTypes.array,
  removePost: PropTypes.func
};

export default PostSneakPeek;
