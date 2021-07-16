import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts.actions';
import { getComments } from '../../actions/comments.actions';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();

  const { posts, loading, error } = useSelector((state) => state.postsState);
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
  } = useSelector((state) => state.commentsState);

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

          return (
            <>
              <h3>
                <Link to={`article/${post.id}`}>{post.title} </Link>
              </h3>
              <p>{post.body}</p>
              {commentsMatching && (
                <span>Comments: {commentsMatching.length}</span>
              )}
            </>
          );
        })}
      </div>
    </section>
  );
};

export default Home;
