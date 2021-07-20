import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts.actions';
import { getComments } from '../../actions/comments.actions';

import Container from '../../components/Container';
import SneakPeek from '../../components/SneakPeek';
import QuantityChanger from '../../components/QuantityChanger';
import Loader from '../../components/Loader';

const Home = () => {
  const [postsQuantity, setPostsQuantity] = useState(8);

  let { posts, loading: postsLoading, error: postsError } = useSelector(
    (state) => state.postsState
  );
  const { comments } = useSelector((state) => state.commentsState);
  const { searchPosts } = useSelector((state) => state.searchState);
  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const { favoriteComments } = useSelector(
    (state) => state.favoriteCommentsState
  );

  const dispatch = useDispatch();

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchPosts.toLowerCase())
  );

  const reducedPosts = filteredPosts.slice(0, postsQuantity);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getComments());
  }, [dispatch]);

  const countQuantity =
    postsQuantity > filteredPosts.length ? filteredPosts.length : postsQuantity;

  return postsLoading ? (
    <Loader />
  ) : postsError ? (
    <>
      <p style={{ textAlign: 'center', lineHeight: 2 }}>
        Coś poszło nie tak z ładowaniem postów... <br />
        Załaduj stronę jeszcze raz!
      </p>
    </>
  ) : (
    <>
      <Container home>
        {reducedPosts.map((post) => (
          <SneakPeek
            key={post.id}
            post={post}
            comments={comments}
            favoriteComments={favoriteComments}
            favoritePosts={favoritePosts}
          />
        ))}
      </Container>
      <QuantityChanger
        rangeSize={4}
        maxSize={filteredPosts.length}
        quantity={countQuantity}
        setQuantity={setPostsQuantity}
      />
    </>
  );
};

export default Home;
