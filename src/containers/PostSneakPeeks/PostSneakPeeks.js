import React, { useState } from 'react';
import { Container, PostSneakPeek, QuantityChanger } from '../../components';

const PostSneakPeeks = ({
  initialQuantity,
  posts,
  comments,
  favoritePosts,
  favoriteComments,
  favoritesPage,
  removePost,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const reducedPosts = posts.slice(0, quantity);
  const countQuantity = quantity > posts.length ? posts.length : quantity;

  return (
    <Container base>
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

export default PostSneakPeeks;
