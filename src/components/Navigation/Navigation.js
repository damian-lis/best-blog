import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size';
import { SearchBar, DynamicIcon } from '../../components';
import { appLogo, heartIcon } from '../../assets';
import styles from './navigation.module.css';

const Navigation = () => {
  const history = useHistory();

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [currentPagePath, setCurrentPagePath] = useState(history.location.pathname);
  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const { favoriteComments } = useSelector((state) => state.favoriteCommentsState);

  const isMobile = useWindowWidth() < 600;

  const isSearchBarHide = currentPagePath === '/favorites' || currentPagePath.includes('article');

  const favoritesNumber = favoritePosts.length + favoriteComments.length;

  history.listen((location) => setCurrentPagePath(location.pathname));

  useEffect(() => {
    setIsSearchActive(false);
  }, [currentPagePath]);

  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation__content}>
        <div
          className={`${styles.navigation__item} ${
            isSearchActive ? styles['navigation__item--dynamic'] : ''
          }`}>
          <Link to="/">
            <DynamicIcon src={appLogo} label={!isMobile ? 'BestBlog' : ''} link white reverse />
          </Link>
        </div>
        {!isSearchBarHide && (
          <SearchBar
            navigation
            posts
            setSearchActive={setIsSearchActive}
            searchActive={isSearchActive}
          />
        )}
        <ul className={styles.navigation__list}>
          <li
            className={`${styles.navigation__item} ${
              isSearchActive ? styles['navigation__item--dynamic'] : ''
            }`}
            key={'favorites'}>
            <Link to="/favorites">
              <DynamicIcon
                src={heartIcon}
                number={favoritesNumber}
                label={!isMobile ? 'Favorites' : ''}
                link
                white
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
