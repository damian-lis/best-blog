import React from 'react';
import { Link } from 'react-router-dom';
import './sneakPeek.css';
import SneakPeekImg from '../../assets/sneakPeek.svg';
import DynamicIcon from '../DynamicIcon';
import TrashIcon from '../../assets/trashIcon.svg';
import HeartIcon from '../../assets/heartIcon.svg';
import ChatBubbleIcon from '../../assets/chatBubbleIcon.svg';

const SneakPeek = ({
  post,
  favorites,
  comments = [],
  favoritePosts = [],
  favoriteComments = [],
  handleRemove,
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
    <div {...restProps} className='sneak-peek'>
      {isPostLiked && (
        <div className='sneak-peek__icon sneak-peek__icon--attached'>
          <DynamicIcon src={HeartIcon} small label='Polubiony!' />
        </div>
      )}
      <img className='sneak-peek__img' src={SneakPeekImg} />
      <h3 className='sneak-peek__title'>{post.title}</h3>
      <div className='sneak-peek__stats'>
        <Link className='sneak-peek__link' to={`article/${post.id}`}>
          Zobacz post
        </Link>
        {!favorites && postComments && (
          <>
            <div className='sneak-peek__stat'>
              <DynamicIcon
                src={ChatBubbleIcon}
                medium
                number={postComments.length}
                label='Komentarze'
              />
            </div>
            <div className='sneak-peek__stat'>
              <DynamicIcon
                src={HeartIcon}
                medium
                number={postCommentsLiked.length}
                label='Polubione'
              />
            </div>
          </>
        )}
        {favorites && (
          <div onClick={() => handleRemove(post)} className='sneak-peek__stat'>
            <DynamicIcon link label='Usuń' medium src={TrashIcon} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SneakPeek;
