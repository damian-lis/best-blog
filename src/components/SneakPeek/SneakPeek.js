import React from 'react';
import { Link } from 'react-router-dom';
import './sneakPeek.css';
import SneakPeekImg from '../../assets/sneakPeek.svg';
import Heart from '../Heart';
import ChatBubble from '../ChatBubble';
import TrashIcon from '../../assets/trashIcon.svg';

const SneakPeek = ({
  post,
  favorites,
  comments = [],
  favoritePosts = [],
  favoriteComments = [],
  handleRemove,
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
    <div
      {...restProps}
      className={`sneak-peek ${favorites ? 'sneak-peek--favorite' : ''}`}
    >
      {postLiked && (
        <div className='sneak-peek__post-liked'>
          <Heart />
        </div>
      )}
      <img className='sneak-peek__img' src={SneakPeekImg} />

      <h3 className='sneak-peek__title'>{post.title}</h3>

      <div className='sneak-peek__stats'>
        <Link className='sneak-peek__link' to={`article/${post.id}`}>
          Zobacz post
        </Link>
        {!favorites && commentsMatching && (
          <>
            <div className='sneak-peek__stat'>
              <span className='sneak-peek__label'>Komentarze</span>
              <div className='sneak-peek__icon-container'>
                <ChatBubble number={commentsMatching.length} />
              </div>
            </div>
            <div className='sneak-peek__stat'>
              <span className='sneak-peek__label'>Polubione</span>
              <div className='sneak-peek__icon-container'>
                <Heart number={commentsLiked.length} />
              </div>
            </div>
          </>
        )}
        {favorites && (
          <div onClick={() => handleRemove(post)} className='sneak-peek__stat'>
            <span className='sneak-peek__label'>Usuń</span>
            <div className='sneak-peek__icon-container'>
              <img className='sneak-peek__icon' src={TrashIcon} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SneakPeek;
