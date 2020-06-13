import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './UserSelect.css';
import UserPopup from './UserPopup/UserPopup';

export default function Profile(props) {
  const addSelected = (user, event) => {
    event.target.parentElement.style.display = 'none';

    props.select(user);
    console.log(props.selected.constructor);

    console.log(Object.keys(props.selected).length === 0);
    console.log(props.selected.constructor === Object);

    if (
      Object.keys(props.selected).length === 0 &&
      props.selected.constructor === Object
    )
      props.setInfo([...props.Info.filter((u) => u.userID != user.userID)]);
    else
      props.setInfo([
        ...props.Info.filter((u) => u.userID != user.userID),
        props.selected,
      ]);
  };

  const removeSelected = (user, event) => {
    console.log('info', event);

    console.log(user.userID);
    props.select({});
    console.log(props.selected);

    props.setInfo([...props.Info, user]);
  };

  const showList = (e) => {
    e.target.parentElement.children[1].style.display = 'block';
    props.setUnFocus([...props.toUnFocus, e.target.parentElement.children[1]]);
    // console.log(e.target.parentElement.children[1]);
    // console.log(props.toUnFocus);
  };
  return (
    <>
      {props.loading ? null : (
        <div className="uk-margin userSelect">
          {props.label && (
            <label className="uk-text-emphasis" htmlFor={props.id}>
              {props.label}
            </label>
          )}
          <div className="userInput">
            <input
              className="uk-input uk-form-width-large textInput"
              type="text"
              id={props.id}
              placeholder={props.title}
              onFocus={showList.bind(this)}
            />
            <div className="userInputDropdown userSelect">
              {props.Info.map((user, index) => {
                return (
                  <div
                    className="uk-input uk-form-width-large selection"
                    key={index}
                    onClick={addSelected.bind(this, user)}
                  >
                    {user.name}
                  </div>
                );
              })}
            </div>
            {Object.keys(props.selected).length !== 0 &&
              props.selected.constructor === Object && (
                <UserPopup user={props.selected}>
                  <i
                    className="iconActUser"
                    uk-icon="icon: close;"
                    onClick={removeSelected.bind(this, props.selected)}
                  ></i>
                </UserPopup>
              )}
          </div>
        </div>
      )}
    </>
  );
}
