import React from 'react';
import { Link } from 'react-router-dom';
import styles from './postSneakPeek.module.css';
import SneakPeekImg from '../../assets/sneakPeek.svg';
import DynamicIcon from '../DynamicIcon';
import TrashIcon from '../../assets/trashIcon.svg';
import HeartIcon from '../../assets/heartIcon.svg';
import ChatBubbleIcon from '../../assets/chatBubbleIcon.svg';

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
  const postCommentsLiked = favoriteComments.filter(
    (comment) => comment.postId === post.id
  );
  const isPostLiked = favoritePosts.some(
    (favoritePost) => favoritePost.id === post.id
  );

  return (
    <div {...restProps} className={styles.postSneakPeek}>
      {isPostLiked && (
        <div
          className={`${styles.postSneakPeek__iconContainer} ${styles['postSneakPeek__iconContainer--attached']}`}
        >
          <DynamicIcon src={HeartIcon} small />
        </div>
      )}
      <div className={styles.postSneakPeek__imgContainer}>
        <img className={styles.postSneakPeek__img} src={SneakPeekImg} />
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
                src={ChatBubbleIcon}
                medium
                number={postComments.length}
                label='Komentarze'
              />
            </div>
            <div className={styles.postSneakPeek__iconContainer}>
              <DynamicIcon
                src={HeartIcon}
                medium
                number={postCommentsLiked.length}
                label='Polubione'
              />
            </div>
          </>
        )}
        {favoritesPage && (
          <div
            onClick={() => removePost(post)}
            className={styles.postSneakPeek__iconContainer}
          >
            <DynamicIcon link label='Usuń' medium src={TrashIcon} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostSneakPeek;
