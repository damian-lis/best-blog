import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addFavoritePost, removeFavoritePost } from '/src/actions/posts.actions';
import { DynamicIcon } from '/src/components';
import { grayHeartIcon, postSneakPeekImg, heartIcon } from '/src/assets';
import { createContent } from '/src/helpers';
import styles from './post.module.css';

const Post = ({ data = {}, ...restProps }) => {
  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const isPostLiked = favoritePosts.some((favoritePost) => favoritePost.id === data.id);

  const postContent = createContent(data.body);

  const dispatch = useDispatch();

  const handleTogglePostLike = () => {
    dispatch(isPostLiked ? removeFavoritePost(data) : addFavoritePost(data));
  };
  return (
    <div {...restProps} className={styles.post}>
      <div className={styles.post__imgContainer}>
        <img src={postSneakPeekImg} alt="postSneakPeekImg" className={styles.post__img} />
      </div>
      <h2 className={styles.post__title}>{data.title}</h2>
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
          asLink
          toggleValue={isPostLiked}
          toggleTrueSrc={heartIcon}
          toggleFalseSrc={grayHeartIcon}
          label={isPostLiked ? 'Lubisz!' : 'Zareaguj'}
        />
      </div>
    </div>
  );
};

Post.propTypes = {
  data: PropTypes.object.isRequired
};

export default Post;
