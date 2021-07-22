import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size';
import PropTypes from 'prop-types';
import { searchPosts, searchComments } from '/src/actions/search.actions';
import { searchIcon, searchIconWhite, deleteIcon } from '/src/assets';
import styles from './searchBar.module.css';

const SearchBar = ({
  posts,
  navigation,
  small,
  comments,
  setSearchActive = () => {},
  searchActive,
  ...restProps
}) => {
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
      {...restProps}
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
        src={navigation ? (isMobile && !isSearch ? searchIconWhite : searchIcon) : searchIcon}
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

SearchBar.propTypes = {
  posts: PropTypes.bool,
  navigation: PropTypes.bool,
  small: PropTypes.bool,
  comments: PropTypes.bool,
  setSearchActive: PropTypes.func,
  searchActive: PropTypes.bool
};

export default SearchBar;
