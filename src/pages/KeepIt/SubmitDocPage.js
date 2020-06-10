import React, { useState, useEffect } from 'react';

import './SubmitDocPage.css';

import Navbar from '../../components/Navbar/Navbar';
import UserSelect from '../../components/UserSelect/UserSelect';
import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';

const { getAllUserInfo } = require('../../util/restCall_users');

export default function LayoutPage(props) {
  const [loading, setLoading] = useState(true);
  const [clicks, setClicks] = useState(0);
  const [userInfo, setUserInfo] = useState();
  const [selectedUsersEdit, selectUserEdit] = useState([]);
  const [selectedUsersRead, selectUserRead] = useState([]);
  const [departs, setDeparts] = useState();
  const [selectedDeparts, selectDepart] = useState([]);
  const [toUnFocus, setUnFocus] = useState([]);

  const unfoc = () => {
    if (toUnFocus.length>0 && clicks>0) {
      toUnFocus[0].style.display = 'none';
      setUnFocus(toUnFocus.filter((f) => f != toUnFocus[0]));
      setClicks(0);
    }else{ if(toUnFocus.length>0){setClicks(clicks+1);}}
  };

  useEffect( async () => {

    const userID = localStorage.getItem('userID');
    let userTemp = await getAllUserInfo();
    setUserInfo(userTemp.data.filter((u) => u.userID != userID));

    setDeparts([{
      departmentID:1,
      name:"testesA"
    },{
      departmentID:2,
      name:"testesB"
    },{
      departmentID:3,
      name:"testesC"
    },{
      departmentID:4,
      name:"testesD"
    },{
      departmentID:5,
      name:"testesE"
    }]);

    setLoading(false);
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
              <label><input class="uk-checkbox uk-margin-medium-left" type="checkbox"/> This document has a model document</label>
            </div>
            <UserSelect
              title="Select Users to Edit the Document"
              selected={selectedUsersEdit}
              select={selectUserEdit}
              Info={userInfo}
              setInfo={setUserInfo}
              loading={loading}
              toUnFocus={toUnFocus}
              setUnFocus={setUnFocus}
            />
            <UserSelect
              title="Select Users to Access the Document"
              selected={selectedUsersRead}
              select={selectUserRead}
              Info={userInfo}
              setInfo={setUserInfo}
              loading={loading}
              toUnFocus={toUnFocus}
              setUnFocus={setUnFocus}
            />
            <div>
              <label><input class="uk-checkbox uk-margin-small-left" type="checkbox"/> Public</label>
              <label><input class="uk-checkbox uk-margin-medium-left" type="checkbox"/> External</label>
              <label><input class="uk-checkbox uk-margin-medium-left" type="checkbox" checked="true"/> This document will have records</label>
            </div>
            <UserSelect
              title="Select a/multiple Departments to associate the Document"
              selected={selectedDeparts}
              select={selectDepart}
              Info={departs}
              setInfo={setDeparts}
              loading={loading}
              toUnFocus={toUnFocus}
              setUnFocus={setUnFocus}
            />
            <Input
              id="name"
              type="text"
              control="textarea"
              rows="5"
              placeholder="Insert a Description"
              newInputClasses="uk-form-width-large"
              required={true}
            />
            FALTA O USER DE APROVAÇÃO!!!
            <Button
                children="Save"
                newClasses="uk-margin-small-top uk-margin-small-right uk-margin-small-left"
            />
            <Button
                children="Submit"
                newClasses="uk-margin-small-top uk-margin-small-left"
            />
          </form>
        </div>
      </div>
    </>
  );
}
