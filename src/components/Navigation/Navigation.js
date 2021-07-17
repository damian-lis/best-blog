import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from '../Search';
import './navigation.css';

const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'Favorites', path: '/favorites' },
];

const Navigation = () => {
  const [currentPagePath, setCurrentPagePath] = useState('/');

  const history = useHistory();

  history.listen((location) => setCurrentPagePath(location.pathname));

  const isFavoritePage =
    currentPagePath === '/favorites' || currentPagePath.includes('article');

  console.log(isFavoritePage);

  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const { favoriteComments } = useSelector(
    (state) => state.favoriteCommentsState
  );

  const favoritesNumber = favoritePosts.length + favoriteComments.length;

  return (
    <nav className='navigation'>
      <h3 className='navigation__logo'>Best Blog</h3>
      {!isFavoritePage && <Search posts />}
      <ul className='navigation__list'>
        {navLinks.map((navLink) => (
          <li className='navigation__item' key={navLink}>
            <Link to={navLink.path}>
              {navLink.title === 'Favorites'
                ? navLink.title + ` (${favoritesNumber})`
                : navLink.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
