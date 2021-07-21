import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size';
import SearchBar from '../SearchBar';
import DynamicIcon from '../DynamicIcon';
import AppLogo from '../../assets/appLogo2.svg';
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

  const isSearchBarHide =
    currentPagePath === '/favorites' || currentPagePath.includes('article');

  const favoritesNumber = favoritePosts.length + favoriteComments.length;

  history.listen((location) => setCurrentPagePath(location.pathname));

  useEffect(() => {
    setIsSearchActive(false);
  }, [currentPagePath]);

  return (
    <nav className='navigation'>
      <div className='navigation__content'>
        <div
          className={`navigation__item ${
            isSearchActive ? 'navigation__item--dynamic' : ''
          }`}
        >
          <Link to='/'>
            <DynamicIcon
              src={AppLogo}
              label={!isMobile ? 'BestBlog' : ''}
              link
              white
              reverse
            />
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
        <ul className='navigation__list'>
          <li
            className={`navigation__item ${
              isSearchActive ? 'navigation__item--dynamic' : ''
            }`}
            key={'favorites'}
          >
            <Link to='/favorites'>
              <DynamicIcon
                src={HeartIcon}
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
