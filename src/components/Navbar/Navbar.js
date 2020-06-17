import React from 'react';

import './Navbar.css';

import Burger from './Burger/Burger';
import Searchbar from './Searchbar/Searchbar';
import Shortcut from './Shortcut/Shortcut';
import Profile from './Profile/Profile';
import DocSelectOne from '../DocsSelect/DocsSelectOne';

export default function Navbar(props) {
  // const [state, setstate] = useState(0);
  const userShortcuts = [
    { name: 'Shortcut 1', link: '#' },
    { name: 'Shortcut 2', link: '#' },
    { name: 'Shortcut 3', link: '#' },
  ];
  return (
    <>
      <div className="navContainer">
        <Burger />
        <DocSelectOne
                title="Search"
                id="searchBar"
              />
        <div className="shortcutGroup">
          {userShortcuts.map((shortcut, index) => {
            return <Shortcut key={index} shortcut={shortcut} />;
          })}
        </div>
        <Profile onLogout={props.onLogout} userInfo={props.userInfo} />
      </div>
      <hr />
    </>
  );
}
