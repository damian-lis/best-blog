import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size';
import { searchPosts, searchComments } from '../../actions/search.actions';
import './searchBar.css';
import SearchIcon from '../../assets/searchIcon.svg';
import DeleteIcon from '../../assets/deleteIcon.svg';

const SearchBar = ({
  navigation,
  posts,
  comments,
  setSearchActive,
  searchActive,
}) => {
  const [isSearch, setIsSearch] = useState(false);

  const {
    searchPosts: searchPostsValue,
    searchComments: searchCommentsValue,
  } = useSelector((state) => state.searchState);

  const dispatch = useDispatch();

  const inputValue = posts ? searchPostsValue : searchCommentsValue;

  const isMobile = useWindowWidth() < 600;

  const handleInputOnChange = (e) => {
    posts && dispatch(searchPosts(e.target.value));
    comments && dispatch(searchComments(e.target.value));
  };

  const handleDeleteIconOnClick = () => {
    dispatch(posts ? searchPosts('') : searchComments(''));
  };

  const handleSearchIconOnClick = () => {
    if (!isMobile) return;

    setIsSearch(!isSearch);
    if (setSearchActive) {
      setSearchActive(!searchActive);
    }
  };

  useEffect(() => {
    dispatch(searchPosts(''));
  }, []);

  return (
    <div
      className={`search-bar ${
        navigation && !searchActive && isMobile ? 'search-bar--mobile' : ''
      }
        ${!navigation ? 'search-bar--small' : ''}`}
    >
      <input
        className='search-bar__input'
        value={inputValue}
        onChange={handleInputOnChange}
        placeholder={posts ? 'Szukaj po tytule...' : 'Szukaj po emailu...'}
      />
      <img
        className='search-bar__search-icon'
        src={SearchIcon}
        onClick={handleSearchIconOnClick}
      />
      {inputValue && (
        <img
          className='search-bar__delete-icon'
          src={DeleteIcon}
          onClick={handleDeleteIconOnClick}
        />
      )}
    </div>
  );
};

export default SearchBar;
