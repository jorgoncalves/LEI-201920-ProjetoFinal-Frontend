import React, { useState, useEffect } from 'react';

import Navbar from '../../components/Navbar/Navbar';
import UserCard from '../../components/UserCard/UserCard';
import './DepartmentPage.css';
import Loading from '../../components/Loading/Loading';

const { getUserDepartColleagues } = require('../../util/restCall_departs');

export default function LayoutPage(props) {
  const [loading, setLoading] = useState(true);
  const [departColleagues, setDepartColleagues] = useState();
  const currentUser = localStorage.getItem('userID');

  useEffect(() => {
    async function departColleaguesInform() {
      let departColleaguesInfo = await getUserDepartColleagues(currentUser);
      console.log("given",departColleaguesInfo);
      setDepartColleagues(departColleaguesInfo.resp.data.respDepartUsers);
      setLoading(false);
    }
    departColleaguesInform();
  }, []);

  console.log('teste', departColleagues);

  return (
    <>
      <>
        <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
        {loading ? (
          <Loading />
        ) : ( 
        <> 
          {departColleagues.length > 0 ? (
            <div className="profileBox">
              <ul uk-tab="true" uk-switcher="animation: uk-animation-fade">
                {departColleagues.map((depart, index) => {
                  return (
                    <li key={index}>
                      <a className="departTitle">{depart.departInfo.name}</a>
                    </li>
                  );
                })}
              </ul>
              <div className="uk-switcher">
                {departColleagues.map((depart, index) => {
                  return (
                    <div
                      key="index"
                      className="profileBox parentFlex uk-child-width-1-5@m uk-grid-small uk-grid-match"
                      uk-grid="true"
                    >
                      {depart.departInfo.userInDepartInfo.map((user, idx) => {
                        console.log('user', user);
                        return (
                          <UserCard
                            key={idx}
                            userInfo={user}
                            departChief={depart.departInfo.chief_userID}
                            currentUser={currentUser}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="profileBox">
              <h2>
                You are not setup in a Department
              </h2>
            </div>
          )}
        </>
        )}
      </>
    </>
  );
}
