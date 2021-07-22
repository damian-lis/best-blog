import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, PostSneakPeek, QuantityChanger } from '/src/components';

const PostSneakPeeks = ({
  initialQuantity = 1,
  posts = [],
  comments = [],
  favoritePosts = [],
  favoriteComments = [],
  favoritesPage,
  removePost = () => {},
  ...restProps
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const reducedPosts = posts.slice(0, quantity);
  const countQuantity = quantity > posts.length ? posts.length : quantity;

  return (
    <Container {...restProps} base>
      <Container wrap>
        {reducedPosts.map((post) => (
          <PostSneakPeek
            favoritesPage={favoritesPage}
            key={post.id}
            post={post}
            comments={comments}
            favoriteComments={favoriteComments}
            favoritePosts={favoritePosts}
            removePost={removePost}
          />
        ))}
      </Container>
      <QuantityChanger
        rangeSize={4}
        maxSize={posts.length}
        quantity={countQuantity}
        setQuantity={setQuantity}
      />
    </Container>
  );
};

PostSneakPeeks.propTypes = {
  initialQuantity: PropTypes.number.isRequired,
  posts: PropTypes.array.isRequired,
  comments: PropTypes.array,
  favoritePosts: PropTypes.array,
  favoriteComments: PropTypes.array,
  favoritesPage: PropTypes.bool,
  removePost: PropTypes.func
};

export default PostSneakPeeks;
