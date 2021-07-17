import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts.actions';
import { getComments } from '../../actions/comments.actions';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();

  const [articlesNumber, setArticlesNumber] = useState(
    Number(localStorage.getItem('postsNumber')) || 10
  );

  let { posts, loading, error } = useSelector((state) => state.postsState);
  const postsLength = posts.length;
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

  posts = posts.slice(0, articlesNumber);

  const handleArticlesNumber = (action) => {
    let range = 6;

    switch (action) {
      case 'add':
        const canAdd = articlesNumber + range < postsLength;
        console.log(canAdd);

        if (!canAdd) {
          range = postsLength - articlesNumber;
        }

        localStorage.setItem(
          'postsNumber',
          JSON.stringify(articlesNumber + range)
        );

        setArticlesNumber(articlesNumber + range);
        break;
      case 'subtract':
        const canSubtract = articlesNumber - range > 0;

        if (!canSubtract) {
          range = posts.length;
        }

        localStorage.setItem(
          'postsNumber',
          JSON.stringify(articlesNumber - range)
        );

        setArticlesNumber(articlesNumber - range);
        break;

      default:
        break;
    }
  };

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
      <button
        disabled={articlesNumber === postsLength}
        onClick={() => handleArticlesNumber('add')}
      >
        Zobacz X następnych postów!
      </button>
      <button
        disabled={articlesNumber === 0}
        onClick={() => handleArticlesNumber('subtract')}
      >
        Schowaj X ostatnich postów!
      </button>
    </section>
  );
};

export default Home;
