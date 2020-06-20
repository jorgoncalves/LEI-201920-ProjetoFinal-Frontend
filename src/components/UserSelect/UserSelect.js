import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

import './Select.css';
import UserPopup from './UserPopup/UserPopup';

export default function Select(props) {
  const [filteredUsers, setFilteredUsers] = useState(props.Info);

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
    setFilteredUsers(props.Info);
    e.target.parentElement.children[1].style.display = 'block';
  };

  const filterUser = async (el) => {
    let temparray = [];
    const elemValue = el.target.value.toLowerCase();
    if (elemValue === '') {
      setFilteredUsers(props.Info);
    } else {
      // filteredUsers.map((user, index) => {
      //   console.log(user.name.toLowerCase().includes(elemValue), user.name);
      //   if (user.name.toLowerCase().includes(elemValue)) {
      //     temparray.push(user);
      //   }
      // });

      for (const user of filteredUsers) {
        console.log(user.name.toLowerCase().includes(elemValue), user.name);
        if (user.name.toLowerCase().includes(elemValue)) {
          temparray.push(user);
        }
      }

      setFilteredUsers(temparray);
    }
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
              onKeyUp={filterUser.bind(this)}
              autoComplete="off"
            />
            <div className="userInputDropdown userSelect">
              {filteredUsers.map((user, index) => {
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
