import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size';
import { searchPosts, searchComments } from 'actions/search.actions';
import { searchIcon, deleteIcon } from 'assets';
import styles from './searchBar.module.css';

const SearchBar = ({ posts, navigation, small, comments, setSearchActive, searchActive }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();
  const isMobile = useWindowWidth() < 600;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    posts && dispatch(searchPosts(e.target.value));
    comments && dispatch(searchComments(e.target.value));
  };

  const handleDeleteIconClick = () => {
    setInputValue('');
    dispatch(posts ? searchPosts('') : searchComments(''));
  };

  const handleSearchIconClick = () => {
    if (!isMobile || !navigation) return;

    setIsSearch(!isSearch);
    if (setSearchActive) {
      setSearchActive(!searchActive);
    }
  };

  useEffect(() => {
    dispatch(searchPosts(''));
  }, [isSearch, dispatch]);

  return (
    <div
      className={`${styles.searchBar}
      ${navigation ? styles['searchBar--nav'] : ''}
       ${isMobile && navigation ? styles['searchBar--mobileNav'] : ''}
        ${small ? styles['searchBar--small'] : ''}
        ${isSearch ? styles['searchBar--mobileActive'] : ''}
        `}>
      <input
        className={`${styles.searchBar__input}
        ${navigation ? styles['searchBar__input--nav'] : ''}
         ${isMobile && navigation && !isSearch ? styles['searchBar__input--mobileNav'] : ''}`}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={posts ? 'Szukaj po tytule...' : 'Szukaj po emailu...'}
      />
      <img
        className={`${styles.searchBar__searchIcon}
        ${navigation ? styles['searchBar__searchIcon--mobileNav'] : ''}
        ${isSearch ? styles['searchBar__searchIcon--mobileActive'] : ''}`}
        src={searchIcon}
        onClick={handleSearchIconClick}
        alt="searchIcon"
      />
      {inputValue && (
        <img
          className={styles.searchBar__deleteIcon}
          src={deleteIcon}
          onClick={handleDeleteIconClick}
          alt="deleteIcon"
        />
      )}
    </div>
  );
};

export default SearchBar;
