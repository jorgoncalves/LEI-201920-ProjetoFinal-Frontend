import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

import './Select.css';
import UserPopup from './UserPopup/UserPopup';

export default function Select(props) {
  const addSelected = (user, event) => {
    event.target.parentElement.style.display = 'none';

    props.select([...props.selected, user]);

    props.setInfo([...props.Info.filter((u) => u.userID !== user.userID)]);
    props.setSubmitValidation((prevState) => {
      return { ...prevState, [props.validationField]: true };
    });
  };

  const removeSelected = (user, event) => {
    props.select([...props.selected.filter((u) => u.userID !== user.userID)]);

    props.setInfo([...props.Info, user]);

    if (props.selected.length <= 1)
      props.setSubmitValidation((prevState) => {
        return { ...prevState, [props.validationField]: false };
      });
  };

  const unShowList = (e) => {
    let temp = e.target.parentElement.children[1];
    setTimeout(() => {
      temp.style.display = 'none';
    }, 100);
  };

  const showList = (e) => {
    e.target.parentElement.children[1].style.display = 'block';
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
          <div className="userInput" onBlur={unShowList.bind(this)}>
            <input
              className="uk-input uk-form-width-large textInput"
              type="text"
              id={props.id}
              placeholder={props.title}
              onFocus={showList.bind(this)}
              // onBlur={unShowList.bind(this)}
              disabled={props.disabled}
              autoComplete="false"
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
            {props.selected.map((user, index) => {
              return (
                <UserPopup key={index} user={user}>
                  {console.log(user.chief_userID, props.userIDUpdate)}
                  {!props.disabled && (
                    <>
                      {props.userIDUpdate !== undefined &&
                      user.chief_userID === props.userIDUpdate ? null : (
                        <i
                          className="iconActUser"
                          uk-icon="icon: close;"
                          onClick={removeSelected.bind(this, user)}
                        ></i>
                      )}
                    </>
                  )}
                </UserPopup>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
