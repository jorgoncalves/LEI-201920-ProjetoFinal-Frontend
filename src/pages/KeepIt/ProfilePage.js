import React, { useState, useEffect } from 'react';

import './ProfilePage.css';

import Navbar from '../../components/Navbar/Navbar';

const {
  getUserInfo
} = require('../../util/restCall_users');

export default function LayoutPage(props) {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    async function userInform() {
      const userID = localStorage.getItem('userID');
      let userInfo = await getUserInfo(userID);
      setUserInfo(userInfo);
      setLoading(false);
    }
    userInform();   
  }, [])
  return (
    <>
    {loading ? (
      null
    ) : (
      <>
      <Navbar onLogout={props.onLogout}/>
      <div className="profileBox">
        <h2 className="uk-heading-divider uk-margin-medium-bottom">User Profile</h2>
        <div className="profileBox">
          <div className="profileLInline">
            <h4 className="uk-comment-title uk-margin-small-bottom"><b>Name: </b>{userInfo.name}</h4>
            <h4 className="uk-comment-title uk-margin-small-bottom uk-margin-small-top"><b>Email: </b>{userInfo.email}</h4>
            <h4 className="uk-comment-title uk-margin-small-bottom uk-margin-small-top"><b>Department: </b>{userInfo.department}</h4>
            <h4 className="uk-comment-title uk-margin-small-bottom uk-margin-medium-top"><b>Country: </b>{userInfo.country}</h4>
    <h4 className="uk-comment-title uk-margin-small-bottom uk-margin-small-top"><b>Phone Number: </b>{ userInfo.country_code && userInfo.phone_number ? 'Tem' : 'Não Tem' }</h4>
          </div>
          <div className="profileRInline">
            xc
          </div>
        </div>
      </div>
      </>
    )} </>
  );
}
