import React, { useState } from 'react';
import UIkit from 'uikit';

import './ShortcutsModal.css';
import Button from '../../Button/Button';
import UserSelectOne from '../../UserSelect/UserSelectOne';

import { updateUserInfo } from '../../../util/restCall_users';

export default function ShortcutsModal(props) {
  const [, forceUpdate] = useState(0);
  const [userID] = useState(localStorage.getItem('userID'));
  const [userDisplay] = useState(JSON.parse(localStorage.getItem('userDisp')));
  const [respLoading, setRespLoading] = useState(false);
  const [selectShort1, setSelectShort1] = useState({
    name: '',
    userID: '',
    link: ''
  });
  const [addNew1, setAddNew1] = useState(false);
  const [selectShort2, setSelectShort2] = useState({
    name: '',
    userID: '',
    link: ''
  });
  const [addNew2, setAddNew2] = useState(false);
  const [selectShort3, setSelectShort3] = useState({
    name: '',
    userID: '',
    link: ''
  });
  const [addNew3, setAddNew3] = useState(false);
  const [, setSubmitValidation] = useState({});

  const [shortcutsList, setShortcutsList] = useState([
    { userID: 1, name: 'Home', link: '/' },
    { userID: 2, name: 'Profile', link: '/profile' },
    { userID: 3, name: 'Department', link: '/department' },
    { userID: 4, name: 'Approved Docs', link: '/useDocs' },
    { userID: 5, name: 'Approving Docs', link: '/aprovDocs' },
    { userID: 6, name: 'Pending Docs', link: '/penDocs' },
    { userID: 7, name: 'Not approved Docs', link: '/notApprovDocs' },
    { userID: 8, name: 'Obsolete Docs', link: '/obsoleteDocs' },
    { userID: 9, name: 'Docs Locations List', link: '/doclocationlist' },
    { userID: 10, name: 'New Document', link: '/newDoc' },
    { userID: 11, name: 'New Record', link: '/submitrecord' },
    { userID: 12, name: 'New Document Location', link: '/doclocation' }
  ]);

  const saveHandler = async () => {
    const obj = userDisplay;
    obj.shortcuts = [];
    if (selectShort1.name !== '') obj.shortcuts.push(selectShort1);
    if (selectShort2.name !== '') obj.shortcuts.push(selectShort2);
    if (selectShort3.name !== '') obj.shortcuts.push(selectShort3);
    const tempObj = { user_display: JSON.stringify(obj) };

    let resp;
    setRespLoading(true);
    resp = await updateUserInfo(userID, tempObj);
    if (resp.status === 201 || resp.status === 200)
      localStorage.setItem('userDisp', JSON.stringify(obj));
    UIkit.modal.dialog(`<p class="uk-modal-body">${resp.message}</p>`);
    forceUpdate((n) => !n);
    setRespLoading(false);
  };

  return (
    <div className="modalShotcurts">
      <div
        className="background"
        onClick={() => {
          if (!respLoading)
            props.setShowModal((prevState) => {
              return { ...prevState, state: false };
            });
        }}
      ></div>
      <div className="uk-card uk-card-default uk-modal-body uk-width-1-2@m">
        <div className="uk-card-body">
          <span className="uk-card-title">Shortcut Management</span>
          <dl className="uk-description-list">
            <UserSelectOne
              title="Select shortcut 1"
              id="Shortcut1"
              label="Shortcut 1"
              selected={selectShort1}
              select={setSelectShort1}
              Info={shortcutsList}
              setInfo={setShortcutsList}
              // onChange={inputChangeHandler}
              addNew={addNew1}
              setAddNew={setAddNew1}
              validationField="Shortcut1"
              setSubmitValidation={setSubmitValidation}
              // disabled={finalDisabled || disabled}
            />
            <UserSelectOne
              title="Select shortcut 2"
              id="Shortcut2"
              label="Shortcut 2"
              selected={selectShort2}
              select={setSelectShort2}
              Info={shortcutsList}
              setInfo={setShortcutsList}
              // onChange={inputChangeHandler}
              addNew={addNew2}
              setAddNew={setAddNew2}
              validationField="Shortcut2"
              setSubmitValidation={setSubmitValidation}
              // disabled={finalDisabled || disabled}
            />
            <UserSelectOne
              title="Select shortcut 3"
              id="Shortcut3"
              label="Shortcut 3"
              selected={selectShort3}
              select={setSelectShort3}
              Info={shortcutsList}
              setInfo={setShortcutsList}
              // onChange={inputChangeHandler}
              addNew={addNew3}
              setAddNew={setAddNew3}
              validationField="Shortcut3"
              setSubmitValidation={setSubmitValidation}
              // disabled={finalDisabled || disabled}
            />
          </dl>
        </div>
        <div className="uk-card-footer buttonContainer">
          <Button
            border=""
            children="SAVE"
            newClasses="uk-margin-small-top uk-margin-small-left modalButton"
            loading={respLoading}
            // disabled={finalDisabled}
            onClick={saveHandler}
          />
          <Button
            border=""
            children="CANCEL"
            newClasses="uk-margin-small-top uk-margin-small-left modalButton"
            loading={respLoading}
            // disabled={finalDisabled}
            onClick={() => {
              if (!respLoading)
                props.setShowModal((prevState) => {
                  return { ...prevState, state: false };
                });
            }}
          />
        </div>
      </div>
    </div>
  );
}
