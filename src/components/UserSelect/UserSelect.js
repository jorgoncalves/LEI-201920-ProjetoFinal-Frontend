import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './UserSelect.css';
import UserPopup from './UserPopup/UserPopup';

export default function Profile(props) {

  const addSelected = (user , event) => {
    event.target.parentElement.style.display="none";

    props.select([...props.selected,user]);

    props.setInfo([...props.Info.filter(u => u.userID != user.userID)]);
  }

  const removeSelected = (user, event) => {
    console.log("info",event);

    console.log(user.userID);
    props.select([...props.selected.filter(u => u.userID != user.userID)]);
    console.log(props.selected);

    props.setInfo([...props.Info,user]);
  }

  const showList = (e) => {
    e.target.parentElement.children[1].style.display="block";
    props.setUnFocus([...props.toUnFocus,e.target.parentElement.children[1]]);
    console.log(e.target.parentElement.children[1]);
    console.log(props.toUnFocus);
  }
  return (
    <>
      {props.loading ? null : (
        <div className="uk-margin userSelect">
          {props.selected.map((user, index) => {
            return(
              <UserPopup key={index} user={user}>
                <i className="iconActUser" uk-icon="icon: close;" onClick={removeSelected.bind(this, user)}></i>
              </UserPopup>
            );
          })
          }
          <div className="userInput">
            <input className="uk-input uk-form-width-large textInput" type="text" placeholder={props.title} onFocus={showList.bind(this)}/>
            <div className="userInputDropdown userSelect">
              {
              props.Info.map((user, index) => {
                return(
                  <div className="uk-input uk-form-width-large selection" key={index} onClick={addSelected.bind(this, user)}>
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
