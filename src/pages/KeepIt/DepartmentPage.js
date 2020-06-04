import React, { useState, useEffect } from 'react';

import Navbar from '../../components/Navbar/Navbar';
import UserCard from '../../components/UserCard/UserCard';
import './DepartmentPage.css'

const {
  getUserDepartColleagues
} = require('../../util/restCall_departs');

export default function LayoutPage(props) {
  //
  //Ir buscar informação FALTA 1 GET DEPARTMENT FROM USER
  //
  const [loading, setLoading] = useState(true);
  const [departColleagues, setDepartColleagues] = useState();
  const currentUser = localStorage.getItem('userID');

  useEffect(() => {
    async function departColleaguesInform() {
      let departColleaguesInfo = await getUserDepartColleagues(currentUser);
      console.log(departColleaguesInfo)
      setDepartColleagues(departColleaguesInfo.resp.data.respDepartUsers);
      setLoading(false);
    }
    departColleaguesInform();
  }, [])

  console.log("teste",departColleagues);

  return (
    <>
      {loading ? (
        null
      ) : (
        <>
        <Navbar onLogout={props.onLogout}/>
        <div className="profileBox">
          <ul uk-tab="true" uk-switcher="animation: uk-animation-fade">
            {departColleagues.map((depart, index) => {
              return (
                  <li key={index}><a className="departTitle">{depart.departInfo.name}</a></li>
              );
            })}
            </ul>
          <div className="uk-switcher">
          {departColleagues.map((depart, index) => {
            return (
              <div key="index" className="profileBox parentFlex uk-child-width-1-5@m uk-grid-small uk-grid-match" uk-grid="true">
              {depart.departInfo.userInDepartInfo.map((user, idx) => {
                  console.log("user",user)
                  return (
                      <UserCard
                      key={idx}
                      userInfo={user}
                      departChief={depart.departInfo.chief_userID}
                      currentUser={currentUser}
                      />
                  );
                })
              }
              </div>
            );
          })}
          </div>
        </div>
        </>
      )}
    </>
  );
}
