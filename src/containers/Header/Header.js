import React, { useState } from 'react';
import { SearchBar, Navigation } from '/src/components';

const Header = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header>
      <Navigation isSearchActive={isSearchActive} setIsSearchActive={setIsSearchActive}>
        <SearchBar
          isNavigation
          postsType
          setSearchActive={setIsSearchActive}
          searchActive={isSearchActive}
        />
      </Navigation>
    </header>
  );
};

export default Header;
