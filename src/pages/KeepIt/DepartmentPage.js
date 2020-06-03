import React, { useState, useEffect } from 'react';

import Navbar from '../../components/Navbar/Navbar';
import UserCard from '../../components/UserCard/UserCard';
import './DepartmentPage.css'

const {
  getAllUserInfo
} = require('../../util/restCall_users');

export default function LayoutPage(props) {
  //
  //Ir buscar informação FALTA 1 GET DEPARTMENT FROM USER
  //
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    async function userInform() {
      let userInfo = await getAllUserInfo();

      setUserInfo(userInfo.data);
      setLoading(false);
    }
    userInform();
  }, [])
  
  console.log("teste",userInfo);

  return (
    <>
      {loading ? (
        null
      ) : (
        <>
        <Navbar onLogout={props.onLogout}/>
        <div className="profileBox">
          <h2 className="uk-heading-divider uk-margin-medium-bottom">Department - "DEPARTMENT GOES HERE"</h2>
          <div className="profileBox parentFlex uk-child-width-1-5@m uk-grid-small uk-grid-match" uk-grid> 
            {userInfo.map((user, index) => {
              return (
                  <UserCard
                    key={index}
                    userInfo={user}
                  />
              );
            })}
          </div>
        </div>
        </>
      )}
    </>
  );
}
