import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { search } from '../../actions/search.actions';
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

  const { searchWord } = useSelector((state) => state.searchState);

  const dispatch = useDispatch();

  const favoritesNumber = favoritePosts.length + favoriteComments.length;

  const handleOnChange = (e) => {
    dispatch(search(e.target.value));
  };

  return (
    <nav className='navigation'>
      <h3 className='navigation__logo'>Best Blog</h3>
      <input
        value={searchWord}
        onChange={handleOnChange}
        placeholder='Wyszukaj...'
      />
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
