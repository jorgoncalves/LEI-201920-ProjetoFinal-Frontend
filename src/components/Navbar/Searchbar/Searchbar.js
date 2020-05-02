import React from 'react';

import './Searchbar.css'

export default function Searchbar() {
  return (
    <>
      <div className="searchBarContainer">
        <form className="uk-search uk-search-default">
          <a href="" className="uk-search-icon-flip" uk-search-icon="true"></a>
          <input
            className="uk-search-input"
            type="search"
            placeholder="Search..."
          />
        </form>
      </div>
    </>
  );
}
