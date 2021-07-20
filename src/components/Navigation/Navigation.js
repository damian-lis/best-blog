import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size';
import SearchBar from '../SearchBar';
import DynamicIcon from '../DynamicIcon';
import AppLogo from '../../assets/appLogo.svg';
import AppLogoMobile from '../../assets/appLogoMobile.svg';
import HeartIcon from '../../assets/heartIcon.svg';
import './navigation.css';

const Navigation = () => {
  const history = useHistory();

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [currentPagePath, setCurrentPagePath] = useState(
    history.location.pathname
  );
  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const { favoriteComments } = useSelector(
    (state) => state.favoriteCommentsState
  );

  const isMobile = useWindowWidth() < 600;
  const isSearchBarTurnOff =
    currentPagePath === '/favorites' || currentPagePath.includes('article');
  const favoritesNumber = favoritePosts.length + favoriteComments.length;

  history.listen((location) => setCurrentPagePath(location.pathname));

  useEffect(() => {
    setIsSearchActive(false);
  }, [currentPagePath]);

  return (
    <nav className='navigation'>
      <div className='navigation__wrapper'>
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
        {!isSearchBarTurnOff && (
          <SearchBar
            navigation
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
            key={'favorites'}
          >
            <Link to='/favorites'>
              <div className='navigation__item-wrapper'>
                {!isMobile && (
                  <span className='navigation__item-label'> Favorites</span>
                )}
                <DynamicIcon src={HeartIcon} number={favoritesNumber} />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
