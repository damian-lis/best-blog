import React from 'react';
import { Link } from 'react-router-dom';
import './sneakPeek.css';
import SneakPeekImg from '../../assets/sneakPeek.svg';
import Heart from '../Heart';
import ChatBubble from '../ChatBubble';

const SneakPeek = ({
  post,
  comments,
  favoritePosts,
  favoriteComments,
  ...restProps
}) => {
  const commentsMatching = comments.filter(
    (comment) => comment.postId === post.id
  );

  const postLiked = favoritePosts.some(
    (favoritePost) => favoritePost.id === post.id
  );

  const commentsLiked = favoriteComments.filter(
    (comment) => comment.postId === post.id
  );

  return (
    <Link
      to={`article/${post.id}`}
      style={{ margin: 10, width: '100%', maxWidth: 335 }}
    >
      <div {...restProps} className='sneak-peek'>
        {postLiked && (
          <div className='sneak-peek__post-liked'>
            <Heart />
          </div>
        )}
        <img className='sneak-peek__img' src={SneakPeekImg} />
        <h3 className='sneak-peek__title'>{post.title}</h3>
        {commentsMatching && (
          <div className='sneak-peek__stats'>
            <div className='sneak-peek__stat'>
              Comments:
              <ChatBubble number={commentsMatching.length} />
            </div>
            <div className='sneak-peek__stat'>
              Liked:
              <Heart number={commentsLiked.length} />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default SneakPeek;
