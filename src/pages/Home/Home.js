import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts.actions';
import { getComments } from '../../actions/comments.actions';

import Container from '../../components/Container';
import SneakPeek from '../../components/SneakPeek';
import QuantityChanger from '../../components/QuantityChanger';

const Home = () => {
  const [postsQuantity, setPostsQuantity] = useState(8);

  let { posts, loading, error } = useSelector((state) => state.postsState);
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
  } = useSelector((state) => state.commentsState);
  const { searchPosts } = useSelector((state) => state.searchState);
  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const { favoriteComments } = useSelector(
    (state) => state.favoriteCommentsState
  );

  const dispatch = useDispatch();

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchPosts)
  );

  const reducedPosts = filteredPosts.slice(0, postsQuantity);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getComments());
  }, [dispatch]);

  return (
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
        maxSize={posts.length}
        quantity={postsQuantity}
        setQuantity={setPostsQuantity}
      />
    </>
  );
};

export default Home;
