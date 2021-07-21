import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size';
import { searchPosts, searchComments } from '../../actions/search.actions';
import { searchIcon, deleteIcon } from '../../assets';
import styles from './searchBar.module.css';

const SearchBar = ({
  posts,
  navigation,
  small,
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
  const isMobile = useWindowWidth() < 600;

  const handleInputChange = (e) => {
    posts && dispatch(searchPosts(e.target.value));
    comments && dispatch(searchComments(e.target.value));
  };

  const handleDeleteIconClick = () => {
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
  }, [isSearch]);

  return (
    <div
      className={`${styles.searchBar}
      ${navigation ? styles['searchBar--nav'] : ''}
       ${isMobile && navigation ? styles['searchBar--mobileNav'] : ''}
        ${small ? styles['searchBar--small'] : ''}
        ${isSearch ? styles['searchBar--mobileActive'] : ''}
        `}
    >
      <input
        className={`${styles.searchBar__input}
        ${navigation ? styles['searchBar__input--nav'] : ''}
         ${
           isMobile && navigation && !isSearch
             ? styles['searchBar__input--mobileNav']
             : ''
         }`}
        value={posts ? searchPostsValue : searchCommentsValue}
        onChange={handleInputChange}
        placeholder={posts ? 'Szukaj po tytule...' : 'Szukaj po emailu...'}
      />
      <img
        className={`${styles.searchBar__searchIcon}
        ${navigation ? styles['searchBar__searchIcon--mobileNav'] : ''}
        ${isSearch ? styles['searchBar__searchIcon--mobileActive'] : ''}`}
        src={searchIcon}
        onClick={handleSearchIconClick}
      />
      {searchPostsValue || searchCommentsValue ? (
        <img
          className={styles.searchBar__deleteIcon}
          src={deleteIcon}
          onClick={handleDeleteIconClick}
        />
      ) : null}
    </div>
  );
};

export default SearchBar;
