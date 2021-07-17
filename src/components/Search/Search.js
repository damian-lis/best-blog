import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchPosts, searchComments } from '../../actions/search.actions';

const Search = ({ posts, comments }) => {
  const handleOnChange = (e) => {
    posts && dispatch(searchPosts(e.target.value));
    comments && dispatch(searchComments(e.target.value));
  };

  const { searchWord } = useSelector((state) => state.searchState);

  const dispatch = useDispatch();
  return (
    <input
      value={searchWord}
      onChange={handleOnChange}
      placeholder={posts ? 'Szukaj po tytule...' : 'Szukaj po emailu...'}
    />
  );
};

export default Search;
