import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size';
import SearchBar from '../SearchBar';
import Heart from '../Heart';
import AppLogo from '../../assets/appLogo.svg';
import AppLogoMobile from '../../assets/appLogoMobile.svg';
import './navigation.css';

const Navigation = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const history = useHistory();
  const [currentPagePath, setCurrentPagePath] = useState(
    history.location.pathname
  );
  const isMobile = useWindowWidth() < 600;

  history.listen((location) => setCurrentPagePath(location.pathname));

  const isTurnOffSearch =
    currentPagePath === '/favorites' || currentPagePath.includes('article');

  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const { favoriteComments } = useSelector(
    (state) => state.favoriteCommentsState
  );

  const favoritesNumber = favoritePosts.length + favoriteComments.length;

  return (
    <nav className='navigation'>
      <div
        className={`navigation__item ${
          isSearchActive ? 'navigation__item--dynamic' : ''
        }`}
      >
        <Link to='/'>
          <img
            className='navigation__logo'
            src={isMobile ? AppLogoMobile : AppLogo}
          />
        </Link>
      </div>
      {!isTurnOffSearch && (
        <SearchBar
          posts
          setSearchActive={setIsSearchActive}
          searchActive={isSearchActive}
        />
      )}
      <ul className='navigation__list'>
        <li
          className={`navigation__item ${
            isSearchActive ? 'navigation__item--dynamic' : ''
          }`}
          key={0}
        >
          <Link to='/favorites'>
            <Heart number={favoritesNumber} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
