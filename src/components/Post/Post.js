import React from 'react';
import { useDispatch } from 'react-redux';
import SneakPeekImg from '../../assets/sneakPeek.svg';
import DynamicIcon from '../../components/DynamicIcon';
import GrayHeartIcon from '../../assets/grayHeartIcon.svg';
import HeartIcon from '../../assets/heartIcon.svg';
import {
  addFavoritePost,
  removeFavoritePost,
} from '../../actions/posts.actions';
import createContent from '../../helpers/createContent';
import styles from './post.module.css';

const Post = ({ post, favoritePosts }) => {
  const postIsLiked = favoritePosts.some(
    (favoritePost) => favoritePost.id === post.id
  );

  const postContent = createContent(post.body);

  const dispatch = useDispatch();

  const handleTogglePostLike = () => {
    dispatch(
      postIsLiked ? removeFavoritePost({ post }) : addFavoritePost({ post })
    );
  };
  return (
    <div className={styles.post}>
      <div className={styles.post__imgContainer}>
        <img src={SneakPeekImg} className={styles.post__img} />
      </div>
      <h2 className={styles.post__title}>{post.title}</h2>
      {postContent.map((postFragment) => (
        <>
          <h3 className={styles.post__headline}>{postFragment.headline}</h3>
          {postFragment.paragraphs.map((paragraph) => (
            <p className={styles.post__paragraph}>{paragraph}</p>
          ))}
        </>
      ))}

      <div
        className={styles.post__iconContainer}
        onClick={handleTogglePostLike}
      >
        <DynamicIcon
          toggle={postIsLiked}
          srcTrue={HeartIcon}
          srcFalse={GrayHeartIcon}
          small
          link
          label={postIsLiked ? 'Lubisz!' : 'Zareaguj'}
        />
      </div>
    </div>
  );
};

export default Post;
