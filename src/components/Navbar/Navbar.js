import React, { useState } from 'react';

import './Navbar.css';

import Burger from './Burger/Burger';
import Searchbar from './Searchbar/Searchbar';
import Shortcut from './Shortcut/Shortcut';
import Profile from './Profile/Profile';

export default function Navbar() {
  // const [state, setstate] = useState(0);
  const [userShortcuts, setUserShortcuts] = useState([
    { name: 'Shortcut 1', link: '#' },
    { name: 'Shortcut 2', link: '#' },
    { name: 'Shortcut 3', link: '#' },
  ]);
  return (
    <>
      <div className="navContainer">
        <Burger />
        <Searchbar />
        <div className="shortcutGroup">
          {userShortcuts.map((shortcut) => {
            return <Shortcut shortcut={shortcut} />;
          })}
        </div>

        <Profile />
      </div>
      <hr />
    </>
  );
}
