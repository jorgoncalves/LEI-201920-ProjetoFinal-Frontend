import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

import './Select.css';
import UserPopup from './UserPopup/UserPopup';

export default function SelectOne(props) {
  const [filteredUsers, setFilteredUsers] = useState(props.Info);

  const [tempEl, setTempEl] = useState({ name: '', userID: '' });
  const addSelected = (user, event) => {
    event.target.parentElement.style.display = 'none';
    if (user.name !== 'Add new' && props.addNew !== undefined) changeAddNew();

    props.select(user);
    setTempEl(user);
    props.setSubmitValidation((prevState) => {
      return { ...prevState, [props.validationField]: true };
    });
    if (props.validationField === 'documentName')
      props.setSaveValidation((prevState) => {
        return { ...prevState, [props.validationField]: true };
      });
    if (
      (Object.keys(props.selected).length === 0 ||
        props.selected.name === '') &&
      props.selected.constructor === Object
    )
      props.setInfo([...props.Info.filter((u) => u.userID !== user.userID)]);
    else
      props.setInfo([
        ...props.Info.filter((u) => u.userID !== user.userID),
        props.selected,
      ]);
  };

  const removeSelected = (user, event) => {
    console.log(user);
    setTempEl({ name: '', userID: '' });
    props.select({ name: '', userID: '' });
    props.setSubmitValidation((prevState) => {
      return { ...prevState, [props.validationField]: false };
    });
    if (props.validationField === 'documentName')
      props.setSaveValidation((prevState) => {
        return { ...prevState, [props.validationField]: false };
      });
    if (props.addNew !== undefined) props.setAddNew(false);
    if (user.name !== '') props.setInfo([...props.Info, user]);
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
  const changeAddNew = () => {
    props.setAddNew(!props.addNew);
  };

  const inputChangeHandler = (id, value, addNew) => {
    props.onChange(id, value, addNew);
  };

  const filterUser = async (el) => {
    let temparray = [];
    const elemValue= el.target.value.toLowerCase();
    if (elemValue==""){
      setFilteredUsers(props.Info)
    }else{
      await setFilteredUsers(props.Info)
      filteredUsers.map((user,index)=>{
        console.log(user.name.toLowerCase().includes(elemValue), user.name);
        if(user.name.toLowerCase().includes(elemValue)){
          temparray.push(user);
        }
      });
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
              value={props.value}
              placeholder={props.title}
              onChange={(e) =>
                inputChangeHandler(props.id, e.target.value, props.addNew)
              }
              onFocus={showList.bind(this)}
              disabled={props.addNew || props.disabled}
              onKeyUp={filterUser.bind(this)}
              autoComplete="off"
            />
            <div className="userInputDropdown userSelect">
              {props.Info.map((user, index) => {
                return (
                  <div
                    className="uk-input uk-form-width-large selection"
                    key={index}
                    onClick={addSelected.bind(this, user)}
                  >
                    {!props.addNew && user.name === 'Add new' ? (
                      <a>{user.name}</a>
                    ) : (
                      user.name
                    )}
                  </div>
                );
              })}
            </div>

            {Object.keys(props.selected).length >= 2 &&
              props.selected.constructor === Object &&
              props.selected.name !== '' && (
                <UserPopup user={props.selected}>
                  {props.disabledSelected ||
                    (!props.disabled && (
                      <i
                        className="iconActUser"
                        uk-icon="icon: close;"
                        onClick={removeSelected.bind(this, props.selected)}
                      ></i>
                    ))}
                </UserPopup>
              )}
          </div>
        </div>
      )}
    </>
  );
}
