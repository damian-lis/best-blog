import React from 'react';
import { Link } from 'react-router-dom';
import { DynamicIcon } from '../../components';
import { trashIcon, heartIcon, chatBubbleIcon, postSneakPeekImg } from '../../assets';
import styles from './postSneakPeek.module.css';

const PostSneakPeek = ({
  post,
  favoritesPage,
  comments = [],
  favoritePosts = [],
  favoriteComments = [],
  removePost,
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
          <DynamicIcon src={heartIcon} small />
        </div>
      )}
      <div className={styles.postSneakPeek__imgContainer}>
        <img className={styles.postSneakPeek__img} src={postSneakPeekImg} />
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
                src={chatBubbleIcon}
                medium
                number={postComments.length}
                label="Komentarze"
              />
            </div>
            <div className={styles.postSneakPeek__iconContainer}>
              <DynamicIcon
                src={heartIcon}
                medium
                number={postCommentsLiked.length}
                label="Polubione"
              />
            </div>
          </>
        )}
        {favoritesPage && (
          <div onClick={() => removePost(post)} className={styles.postSneakPeek__iconContainer}>
            <DynamicIcon link label="Usuń" medium src={trashIcon} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostSneakPeek;
