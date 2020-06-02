import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Profile.css';

export default function Profile() {
  return (
    <div className="profileContainer">
      <a uk-icon="icon: user; ratio: 2"></a>
      <div uk-dropdown="mode: click;" className="dropdownProf">
        <ul className="uk-nav uk-dropdown-nav">
          <li className="profInfo">--NOME--</li>
          <li className="profInfo">--Email--</li>
          <li className="profInfo">--Departamento--</li>
          <li className="uk-nav-divider"></li>
          <li
            className={useLocation().pathname == '/profile' ? 'uk-active' : ''}
          >
            <Link to="/profile" href="#" className="fLeft">
              Settings
            </Link>
          </li>
          <li>
            <a href="#" className="fRight">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
