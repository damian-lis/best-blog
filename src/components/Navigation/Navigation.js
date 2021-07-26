import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size';
import { DynamicIcon } from '/src/components';
import { appLogo, heartIcon } from '/src/assets';
import styles from './navigation.module.css';

const Navigation = ({ children, isSearchActive, setIsSearchActive, ...restProps }) => {
  const history = useHistory();

  const [currentPagePath, setCurrentPagePath] = useState(history.location.pathname);
  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const { favoriteComments } = useSelector((state) => state.favoriteCommentsState);

  const isMobile = useWindowWidth() < 600;

  const isSearchBarHide = currentPagePath === '/favorites' || currentPagePath.includes('article');

  const favoritesNumber = favoritePosts.length + favoriteComments.length;

  history.listen((location) => setCurrentPagePath(location.pathname));

  useEffect(() => {
    setIsSearchActive(false);
  }, [currentPagePath, setIsSearchActive]);

  return (
    <nav {...restProps} className={styles.navigation}>
      <div className={styles.navigation__content}>
        <div
          className={`${styles.navigation__item} ${
            isSearchActive ? styles['navigation__item--dynamic'] : ''
          }`}>
          <Link to="/">
            <DynamicIcon
              asLink
              white
              reverse
              labelMedium
              src={appLogo}
              label={!isMobile ? 'BestBlog' : ''}
            />
          </Link>
        </div>

        {!isSearchBarHide && children}

        <ul className={styles.navigation__list}>
          <li
            className={`${styles.navigation__item} ${
              isSearchActive ? styles['navigation__item--dynamic'] : ''
            }`}
            key={'favorites'}>
            <Link to="/favorites">
              <DynamicIcon
                labelMedium
                asLink
                white
                src={heartIcon}
                number={favoritesNumber}
                label={!isMobile ? 'Ulubione' : ''}
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
