import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts.actions';
import { getComments } from '../../actions/comments.actions';

import Container from '../../components/Container';
import SneakPeek from '../../components/SneakPeek';

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
    <>
      <Container home>
        {posts.map((post) => (
          <SneakPeek
            key={post.id}
            post={post}
            comments={comments}
            favoriteComments={favoriteComments}
            favoritePosts={favoritePosts}
          />
        ))}
      </Container>
      <div>
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
      </div>
    </>
  );
};

export default Home;
