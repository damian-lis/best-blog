import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, PostSneakPeek, QuantityChanger } from '/src/components';

const PostSneakPeeks = ({
  initialQuantity = 1,
  posts = [],
  comments = [],
  favoritePosts = [],
  favoriteComments = [],
  isFavoritesPage,
  removeFavoritePost = () => {}
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const reducedPosts = posts.slice(0, quantity);
  const countedQuantity = quantity > posts.length ? posts.length : quantity;

  return (
    <Container base>
      <Container wrap>
        {reducedPosts.map((post) => (
          <PostSneakPeek
            isFavoritesPage={isFavoritesPage}
            key={post.id}
            post={post}
            comments={comments}
            favoriteComments={favoriteComments}
            favoritePosts={favoritePosts}
            removeFavoritePost={removeFavoritePost}
          />
        ))}
      </Container>
      <QuantityChanger
        rangeSize={4}
        maxSize={posts.length}
        quantity={countedQuantity}
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
  isFavoritesPage: PropTypes.bool,
  removePost: PropTypes.func
};

export default PostSneakPeeks;
