import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Profile.css';

export default function Profile(props) {
  return (
    <div className="profileContainer">
      <a uk-icon="icon: user; ratio: 2"></a>
      <div uk-dropdown="mode: click;">
        <ul className="uk-nav uk-dropdown-nav">
          <li
            className={useLocation().pathname == '/profile' ? 'uk-active' : ''}
          >
            <Link to="/profile" href="#">
              Settings
            </Link>
          </li>
          <li className="uk-nav-divider"></li>
          <li>
            <a onClick={props.onLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
