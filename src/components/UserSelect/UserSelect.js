import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './UserSelect.css';
import UserPopup from './UserPopup/UserPopup';

export default function Profile(props) {

  const addSelectedUser = (user , event) => {
    event.target.parentElement.style.display="none";

    console.log(user.userID)
    props.selectUser([...props.selectedUsers,user])
    console.log(props.selectedUsers);

    props.setUserInfo([...props.userInfo.filter(u => u.userID != user.userID)])
  }

  const removeSelectedUser = (user, event) => {
    console.log("info",event);

    console.log(user.userID)
    props.selectUser([...props.selectedUsers.filter(u => u.userID != user.userID)])
    console.log(props.selectedUsers);

    props.setUserInfo([...props.userInfo,user])
  }

  const showUserList = (e) => {
    e.target.parentElement.children[1].style.display="block"
    props.setUnFocus(e.target.parentElement.children[1])
  }
  return (
    <>
      {props.loading ? null : (
        <div className="uk-margin userSelect">
          {props.selectedUsers.map((user, index) => {
            console.log("teste")
            return(
              <UserPopup key={index} user={user}>
                <i className="iconActUser" uk-icon="icon: close;" onClick={removeSelectedUser.bind(this, user)}></i>
              </UserPopup>
            );
          })
          }
          <div className="userInput">
            <input className="uk-input uk-form-width-large textInput" type="text" placeholder={props.title} onFocus={showUserList.bind(this)}/>
            <div className="userInputDropdown userSelect">
              {props.userInfo.map((user, index) => {
                return(
                  <div className="uk-input uk-form-width-large selection" key={index} onClick={addSelectedUser.bind(this, user)}>
                    {user.name}
                  </div>
                );
              })
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
}
