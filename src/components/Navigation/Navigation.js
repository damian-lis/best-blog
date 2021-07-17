import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './navigation.css';

const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'Favorites', path: '/favorites' },
];

const Navigation = () => {
  const { favoritePosts } = useSelector((state) => state.favoritePostsState);
  const { favoriteComments } = useSelector(
    (state) => state.favoriteCommentsState
  );

  const favoritesNumber = favoritePosts.length + favoriteComments.length;

  return (
    <nav className='navigation'>
      <h3 className='navigation__logo'>Best Blog</h3>
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
