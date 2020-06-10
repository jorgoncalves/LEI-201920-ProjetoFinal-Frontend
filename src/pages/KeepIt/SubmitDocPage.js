import React, { useState, useEffect } from 'react';

import './SubmitDocPage.css';

import Navbar from '../../components/Navbar/Navbar';
import UserSelect from '../../components/UserSelect/UserSelect';
import Input from '../../components/Form/Input/Input';

const { getAllUserInfo } = require('../../util/restCall_users');

export default function LayoutPage(props) {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [selectedUsersEdit, selectUserEdit] = useState([]);
  const [selectedUsersRead, selectUserRead] = useState([]);
  const [toUnFocus, setUnFocus] = useState(undefined);

  const unfoc = () => {
    if (toUnFocus) {
      toUnFocus.style.display = 'none';
      setUnFocus(undefined);
    }
  };

  useEffect(() => {
    async function userInform() {
      const userID = localStorage.getItem('userID');
      let userTemp = await getAllUserInfo();
      //console.log(userInfo.data)
      setUserInfo(userTemp.data.filter((u) => u.userID != userID)); //CHECK!!!
      setLoading(false);
    }
    userInform();
  }, []);

  return (
    <>
      <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
      <div className="profileBox">
        <h2 className="uk-heading-divider uk-margin-medium-bottom">
          Submit new File
        </h2>
        <div className="profileBox" onClick={unfoc}>
          <form>
            <Input
              id="name"
              type="text"
              control="input"
              placeholder="Insert a Name for the Documentation"
              newInputClasses="uk-form-width-large"
              required={true}
            />
            <div className="uk-margin">
              <div uk-form-custom="target: true">
                <input type="file" />
                <input
                  className="uk-input uk-form-width-large"
                  type="text"
                  placeholder="Select file"
                  disabled
                />
              </div>
            </div>
            <UserSelect
              title="Select Users to Edit the Document"
              selectedUsers={selectedUsersEdit}
              selectUser={selectUserEdit}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              loading={loading}
              setUnFocus={setUnFocus}
            />
            <UserSelect
              title="Select Users to Access the Document"
              selectedUsers={selectedUsersRead}
              selectUser={selectUserRead}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              loading={loading}
              setUnFocus={setUnFocus}
            />
          </form>
        </div>
      </div>
    </>
  );
}
