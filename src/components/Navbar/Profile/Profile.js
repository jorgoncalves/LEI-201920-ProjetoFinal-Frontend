import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Profile.css';

// const { getUserInfo } = require('../../../util/restCall_users');

export default function Profile(props) {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [LocationPath] = useState(useLocation().pathname);
  const [isAdmin] = useState(
    localStorage.getItem('isAdmin') === 'true' ? true : false
  );
  useEffect(() => {
    setUserInfo(props.userInfo);
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? null : (
        <div className="profileContainer">
          <a uk-icon="icon: user; ratio: 2"></a>
          <div uk-dropdown="mode: click;" className="dropdownProf">
            <ul className="uk-nav uk-dropdown-nav">
              <li className="profInfo">{userInfo.name}</li>
              <li className="profInfo">{userInfo.email}</li>
              <li className="profInfo">{userInfo.department}</li>
              {console.log(isAdmin)}
              {isAdmin ? (
                <>
                  <li className="uk-nav-divider"></li>
                  <li
                    className={
                      LocationPath === '/adminPanel' ? 'uk-active' : ''
                    }
                  >
                    <Link to="/adminPanel" href="#">
                      Admin Panel
                    </Link>
                  </li>
                </>
              ) : null}
              <li className="uk-nav-divider"></li>
              <li className={LocationPath === '/profile' ? 'uk-active' : ''}>
                <Link to="/profile" href="#" className="fLeft">
                  Settings
                </Link>
              </li>
              <li>
                <a onClick={props.onLogout} className="fRight">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}{' '}
    </>
  );
}
