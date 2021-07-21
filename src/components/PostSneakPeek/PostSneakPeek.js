import React from 'react';
import { Link } from 'react-router-dom';
import './postSneakPeek.css';
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
    <div {...restProps} className='post-sneak-peek'>
      {isPostLiked && (
        <div className='post-sneak-peek__icon-container post-sneak-peek__icon-container--attached'>
          <DynamicIcon src={HeartIcon} small />
        </div>
      )}
      <div className='post-sneak-peek__img-container'>
        <img className='post-sneak-peek__img' src={SneakPeekImg} />
      </div>
      <h3 className='post-sneak-peek__title'>{post.title}</h3>
      <div className='post-sneak-peek__stats'>
        <Link className='post-sneak-peek__link' to={`article/${post.id}`}>
          Zobacz post
        </Link>
        {!favoritesPage && postComments.length && (
          <>
            <div className='post-sneak-peek__icon-container'>
              <DynamicIcon
                src={ChatBubbleIcon}
                medium
                number={postComments.length}
                label='Komentarze'
              />
            </div>
            <div className='post-sneak-peek__icon-container'>
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
            className='post-sneak-peek__icon-container'
          >
            <DynamicIcon link label='Usuń' medium src={TrashIcon} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostSneakPeek;
