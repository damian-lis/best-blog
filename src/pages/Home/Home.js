import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '/src/actions/posts.actions';
import { getComments } from '/src/actions/comments.actions';
import { Loader, Container, ErrorInfo, Headline } from '/src/components';
import { PostSneakPeeks } from '/src/containers';
import { filterElements } from '/src/helpers';

const Home = () => {
  const { posts, loading: postsLoading, error: postsError } = useSelector(
    (state) => state.postsState
  );
  const { comments } = useSelector((state) => state.commentsState);
  const { searchPosts } = useSelector((state) => state.searchState);
  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const { favoriteComments } = useSelector((state) => state.favoriteCommentsState);

  const dispatch = useDispatch();
  const filteredPosts = filterElements(posts, 'title', searchPosts);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getComments());
  }, [dispatch]);

  return postsLoading ? (
    <Loader />
  ) : postsError ? (
    <ErrorInfo />
  ) : (
    <Container base>
      <Headline> Najlepsze artykuły!</Headline>
      <PostSneakPeeks
        posts={filteredPosts}
        initialQuantity={8}
        comments={comments}
        favoriteComments={favoriteComments}
        favoritePosts={favoritePosts}
      />
    </Container>
  );
};

export default Home;
