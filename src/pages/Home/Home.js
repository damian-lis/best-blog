import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts.actions';
import { getComments } from '../../actions/comments.actions';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();

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

  posts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchPosts)
  );

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getComments());
  }, [dispatch]);

  return (
    <section className='container'>
      <div className='row'>
        <h2>Trending Posts</h2>
        {posts.map((post) => {
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
            <div key={post.id}>
              <h3>
                <Link to={`article/${post.id}`}>
                  {post.title} {postLiked && 'Polubiony'}
                </Link>
              </h3>
              <p>{post.body}</p>
              {commentsMatching && (
                <>
                  <span>Comments: {commentsMatching.length}</span>
                  <span>Liked Comments: {commentsLiked.length}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Home;
