import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addFavoritePost, removeFavoritePost } from '/src/actions/posts.actions';
import { DynamicIcon } from '/src/components';
import { grayHeartIcon, postSneakPeekImg, heartIcon } from '/src/assets';
import { createContent } from '/src/helpers';
import styles from './post.module.css';

const Post = ({ post = {}, favoritePosts = [], ...restProps }) => {
  const postIsLiked = favoritePosts.some((favoritePost) => favoritePost.id === post.id);

  const postContent = createContent(post.body);

  const dispatch = useDispatch();

  const handleTogglePostLike = () => {
    dispatch(postIsLiked ? removeFavoritePost({ post }) : addFavoritePost({ post }));
  };
  return (
    <div {...restProps} className={styles.post}>
      <div className={styles.post__imgContainer}>
        <img src={postSneakPeekImg} alt="postSneakPeekImg" className={styles.post__img} />
      </div>
      <h2 className={styles.post__title}>{post.title}</h2>
      {postContent.map((postFragment, index) => (
        <div key={index}>
          <h3 className={styles.post__headline}>{postFragment.headline}</h3>
          {postFragment.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.post__paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      ))}

      <div className={styles.post__iconContainer} onClick={handleTogglePostLike}>
        <DynamicIcon
          imgMedium
          labelMedium
          link
          toggle={postIsLiked}
          srcTrue={heartIcon}
          srcFalse={grayHeartIcon}
          label={postIsLiked ? 'Lubisz!' : 'Zareaguj'}
        />
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  favoritePosts: PropTypes.array.isRequired
};

export default Post;
