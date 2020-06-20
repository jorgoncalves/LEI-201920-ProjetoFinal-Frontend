import React, { useState, useEffect } from 'react';

import './Navbar.css';

import Burger from './Burger/Burger';
// import Searchbar from './Searchbar/Searchbar';
import Shortcut from './Shortcut/Shortcut';
import Profile from './Profile/Profile';
import DocSelectOne from '../DocsSelect/DocsSelectOne';

export default function Navbar(props) {
  const [shortcuts, setShortcuts] = useState(
    JSON.parse(localStorage.getItem('userDisp')).shortcuts
  );

  useEffect(() => {
    setShortcuts(JSON.parse(localStorage.getItem('userDisp')).shortcuts);
  }, [setShortcuts, localStorage.getItem('userDisp')]);

  return (
    <>
      <div className="navContainer">
        <Burger />
        <DocSelectOne title="Search" id="searchBar" />
        <div className="shortcutGroup">
          {shortcuts.map((shortcut, index) => {
            return <Shortcut key={index} shortcut={shortcut} />;
          })}
        </div>
        <Profile onLogout={props.onLogout} userInfo={props.userInfo} />
      </div>
      <hr />
    </>
  );
}
