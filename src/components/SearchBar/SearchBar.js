import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size';
import PropTypes from 'prop-types';
import { searchPosts, searchComments } from '/src/actions/search.actions';
import { searchIcon, searchIconWhite, deleteIcon } from '/src/assets';
import styles from './searchBar.module.css';

const SearchBar = ({
  postsType,
  commentsType,
  isNavigation,
  small,

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
    postsType && dispatch(searchPosts(e.target.value));
    commentsType && dispatch(searchComments(e.target.value));
  };

  const handleDeleteIconClick = () => {
    setInputValue('');
    dispatch(postsType ? searchPosts('') : searchComments(''));
  };

  const handleSearchIconClick = () => {
    if (!isMobile || !isNavigation) return;

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
      ${isNavigation ? styles['searchBar--nav'] : ''}
       ${isMobile && isNavigation ? styles['searchBar--mobileNav'] : ''}
        ${small ? styles['searchBar--small'] : ''}
        ${isSearch ? styles['searchBar--mobileActive'] : ''}
        `}>
      <input
        className={`${styles.searchBar__input}
        ${isNavigation ? styles['searchBar__input--nav'] : ''}
         ${isMobile && isNavigation && !isSearch ? styles['searchBar__input--mobileNav'] : ''}`}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={postsType ? 'Szukaj po tytule...' : 'Szukaj po emailu...'}
      />
      <img
        className={`${styles.searchBar__searchIcon}
        ${isNavigation ? styles['searchBar__searchIcon--mobileNav'] : ''}
        ${isSearch ? styles['searchBar__searchIcon--mobileActive'] : ''}`}
        src={isNavigation ? (isMobile && !isSearch ? searchIconWhite : searchIcon) : searchIcon}
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
  postsType: PropTypes.bool,
  isNavigation: PropTypes.bool,
  small: PropTypes.bool,
  commentsType: PropTypes.bool,
  setSearchActive: PropTypes.func,
  searchActive: PropTypes.bool
};

export default SearchBar;
