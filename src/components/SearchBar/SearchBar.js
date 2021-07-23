import React, { useEffect, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import PropTypes from 'prop-types';
import { searchIcon, searchIconWhite, deleteIcon } from '/src/assets';
import styles from './searchBar.module.css';

const SearchBar = ({
  postsType,
  commentsType,
  isNavigation,
  small,
  searchWord,
  setSearchWord,
  setSearchActive = () => {},
  searchActive,
  ...restProps
}) => {
  const [isSearch, setIsSearch] = useState(false);
  const isMobile = useWindowWidth() < 600;

  const handleInputChange = (e) => {
    setSearchWord(e.target.value);
  };

  const handleDeleteIconClick = () => {
    setSearchWord('');
  };

  const handleSearchIconClick = () => {
    if (!isMobile || !isNavigation) return;

    setIsSearch(!isSearch);
    if (setSearchActive) {
      setSearchActive(!searchActive);
    }
  };

  useEffect(() => {
    setSearchWord('');
  }, [isSearch]);

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
        value={searchWord}
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
      {searchWord && (
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
