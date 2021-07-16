import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

const navLinks = [{ title: 'Home', path: '/' }];

const Navigation = () => {
  return (
    <nav className='navigation'>
      <h3 className='navigation__logo'>Best Blog</h3>
      <ul className='navigation__list'>
        {navLinks.map((navLink) => (
          <li className='navigation__item' key={navLink}>
            <Link to={navLink.path}> {navLink.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
