import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, PostSneakPeek, QuantityChanger, SearchBar } from '/src/components';
import { filterElements } from '/src/helpers';

const PostSneakPeeks = ({
  isFavoritesPage,
  isHomePage,
  initialQuantity = 1,
  posts = [],
  comments = [],
  favoritePosts = [],
  favoriteComments = [],
  removeFavoritePost = () => {}
}) => {
  const [searchPost, setSearchPost] = useState('');
  const [quantity, setQuantity] = useState(initialQuantity);

  let postsData = posts;

  if (!isHomePage) {
    postsData = filterElements(postsData, 'title', searchPost);
  }

  const countedQuantity = quantity > postsData.length ? postsData.length : quantity;
  const reducedPosts = postsData.slice(0, quantity);

  return (
    <Container base>
      <Container style={{ marginBottom: 40 }}>
        {!isHomePage && (
          <SearchBar postsType searchWord={searchPost} setSearchWord={setSearchPost} />
        )}
      </Container>
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
