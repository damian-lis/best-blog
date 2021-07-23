import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchWord } from '/src/actions/searchWord.actions';
import { SearchBar, Navigation } from '/src/components';

const Header = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { searchWord } = useSelector((state) => state.searchWordState);

  const dispatch = useDispatch();

  const handleSearchPost = (value) => {
    dispatch(setSearchWord(value));
  };

  return (
    <header>
      <Navigation isSearchActive={isSearchActive} setIsSearchActive={setIsSearchActive}>
        <SearchBar
          isNavigation
          postsType
          searchWord={searchWord}
          setSearchWord={handleSearchPost}
          setSearchActive={setIsSearchActive}
          searchActive={isSearchActive}
        />
      </Navigation>
    </header>
  );
};

export default Header;
