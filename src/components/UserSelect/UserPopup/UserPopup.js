import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './UserPopup.css';

const { getUserInfo } = require('../../../util/restCall_users');

export default function Profile(props) {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
      setUserInfo(props.user);
      setLoading(false);

  }, [props.user]);


  return (
    <div className="userPopup">
      {props.user.name}
      {props.children}
    </div>
  );
}
