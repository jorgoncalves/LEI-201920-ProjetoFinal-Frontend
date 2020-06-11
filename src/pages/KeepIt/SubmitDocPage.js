import React, { useState, useEffect } from 'react';

import './SubmitDocPage.css';

import Navbar from '../../components/Navbar/Navbar';
import UserSelect from '../../components/UserSelect/UserSelect';
import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';

import { getAllUserInfo } from '../../util/restCall_users';
import {
  getDocsUser,
  getAllDepartments,
  getDocDepartPermissions,
} from '../../util/restCall_Docs';

import { required } from '../../util/validators';

export default function LayoutPage(props) {
  const [userID] = useState(localStorage.getItem('userID'));
  const [loading, setLoading] = useState(true);
  const [clicks, setClicks] = useState(0);
  const [userInfo, setUserInfo] = useState();
<<<<<<< HEAD
  const [approvingList, setApprovingList] = useState();
  const [selectedUsersEdit, selectUserEdit] = useState([]);
  const [selectedUsersRead, selectUserRead] = useState([]);
=======
>>>>>>> cb39da655906000e916bbb11bcb76a712688d234
  const [departs, setDeparts] = useState();
  const [toUnFocus, setUnFocus] = useState([]);
  const [selectedUsersRead, setSelectUserRead] = useState([]);
  const [selectedUsersEdit, setSelectUserEdit] = useState([]);
  const [selectedDeparts, setSelectDepart] = useState([]);
  const [docName, setDocName] = useState({
    value: '',
    valid: false,
    touched: false,
    validators: [required],
  });
  const [docDescription, setDocDescription] = useState({
    value: '',
    valid: false,
    touched: false,
    validators: [required],
  });
  const [docIsPublic, setDocIsPublic] = useState(false);
  const [docIsExternal, setDocIsExternal] = useState(false);
  const [docHasRecords, setDocHasRecords] = useState(false);
  const [docIsModel, setDocIsModel] = useState(false);
  const [docApprovingUserID, setApprovingUserID] = useState();

  const unfoc = () => {
    if (toUnFocus.length > 0 && clicks > 0) {
      toUnFocus[0].style.display = 'none';
      setUnFocus(toUnFocus.filter((f) => f != toUnFocus[0]));
      setClicks(0);
    } else {
      if (toUnFocus.length > 0) {
        setClicks(clicks + 1);
      }
    }
  };

<<<<<<< HEAD
  async function load(){
    const userID = localStorage.getItem('userID');
=======
  const getAllUsersInfo = async () => {
>>>>>>> cb39da655906000e916bbb11bcb76a712688d234
    let userTemp = await getAllUserInfo();
    setApprovingList(userTemp);
    setUserInfo(userTemp.data.filter((u) => u.userID != userID));
  };

  const getAllDeparts = async () => {
    let allDepartments = await getAllDepartments();
    allDepartments = allDepartments.data.respFind;
    setDeparts([...allDepartments]);
  };

<<<<<<< HEAD
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
  }

  async function caller(){
    await load();
    setLoading(false);
  }

  useEffect(() => {
    caller();
=======
  const pendingInfo = async () => {
    const documentID = props.location.state.file.documentID;
    let documentsPermissions = await getDocsUser(null, null, documentID);
    documentsPermissions = documentsPermissions.data.documents;
    setApprovingUserID(props.location.state.file.approving_userID);
    for (let i = 0; i < documentsPermissions.length; i++) {
      const element = documentsPermissions[i];
      if (element.type_access === 1)
        setSelectUserEdit((prevState) => [...prevState, element.userID]);
      if (
        element.type_access === 2 &&
        element.approving_userID !== element.userID
      )
        setSelectUserRead((prevState) => [...prevState, element.userID]);
    }

    let docDepartPermissions = await getDocDepartPermissions(documentID);
    docDepartPermissions = docDepartPermissions.data.docPermisions;
    setDeparts((prevState) => {
      const oldSelectedDeparts = docDepartPermissions.map(
        (perm) => perm.departmentID
      );
      console.log(oldSelectedDeparts);

      console.log(prevState);

      const updatedDeparts = [...prevState, ...oldSelectedDeparts];
      console.log(updatedDeparts);

      return updatedDeparts;
    });
    // clean up dos departamentos já selecionados

    console.log(props.location.state.file.description);
    setDocIsPublic(props.location.state.file.is_public);
    setDocIsExternal(props.location.state.file.is_external);
    setDocHasRecords(props.location.state.file.has_records);
    setDocIsModel(props.location.state.file.isModelFile);
    setDocName((prevState) => {
      return {
        ...prevState,
        value: props.location.state.file.name,
      };
    });
    setDocDescription((prevState) => {
      return {
        ...prevState,
        value: props.location.state.file.description,
      };
    });
  };

  const functionsCallers = async () => {
    await getAllDeparts();
    await getAllUsersInfo();
    if (
      props.location.state !== undefined &&
      props.location.state.from === '/penDocs'
    )
      await pendingInfo();
    setLoading(false);
  };

  useEffect(() => {
    console.log(props);

    functionsCallers();

    return () => {
      setLoading(false);
    };
>>>>>>> cb39da655906000e916bbb11bcb76a712688d234
  }, []);

  const inputChangeHandler = (input, e) => {
    console.log(input);

    if (input === 'isPublic') setDocIsPublic(e.target.checked);
    if (input === 'isExternal') setDocIsExternal(e.target.checked);
    if (input === 'isHasRecords') setDocHasRecords(e.target.checked);
    if (input === 'isModel') setDocIsModel(e.target.checked);
  };

  return (
    <>
      <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
<<<<<<< HEAD
      <div className="submitBox">
        <h2 className="uk-heading-divider uk-margin-medium-bottom">
          Submit new File
        </h2>
        <div className="submitBox" onClick={unfoc}>
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
              <label><input className="uk-checkbox uk-margin-medium-left" type="checkbox"/> This is a model document</label>
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
              <label><input className="uk-checkbox uk-margin-small-left" type="checkbox"/> Public</label>
              <label><input className="uk-checkbox uk-margin-medium-left" type="checkbox"/> External</label>
              <label><input className="uk-checkbox uk-margin-medium-left" type="checkbox" checked="true"/> This document will have records</label>
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
            EM FALTA APPROVING USER
            {/* <Input
              id="approvingUser"
              type="select"
              control="selectUser"
              newDivClasses="inlineB5 usr_info_put uk-margin-remove-top"
              placeholder="Select an Approving User for the document"
              options={approvingList}
            />
            {console.log("approve",approvingList)} */}
            <Button
=======
      {loading ? (
        <Loading />
      ) : (
        <div className="profileBox">
          <h2 className="uk-heading-divider uk-margin-medium-bottom">
            Submit new File
          </h2>
          <div className="profileBox" onClick={unfoc}>
            <form>
              <Input
                id="name"
                type="text"
                value={docName.value}
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
                <label>
                  <input
                    className="uk-checkbox uk-margin-medium-left"
                    type="checkbox"
                    defaultChecked={docIsModel}
                    onChange={inputChangeHandler.bind(this, 'isModel')}
                  />
                  This document has a model document
                </label>
              </div>
              <UserSelect
                title="Select Users to Edit the Document"
                selected={selectedUsersEdit}
                select={setSelectUserEdit}
                Info={userInfo}
                setInfo={setUserInfo}
                loading={loading}
                toUnFocus={toUnFocus}
                setUnFocus={setUnFocus}
              />
              <UserSelect
                title="Select Users to Access the Document"
                selected={selectedUsersRead}
                select={setSelectUserRead}
                Info={userInfo}
                setInfo={setUserInfo}
                loading={loading}
                toUnFocus={toUnFocus}
                setUnFocus={setUnFocus}
              />
              <div>
                <label>
                  <input
                    className="uk-checkbox uk-margin-small-left"
                    type="checkbox"
                    defaultChecked={docIsPublic}
                    onChange={inputChangeHandler.bind(this, 'isPublic')}
                  />
                  Public
                </label>
                <label>
                  <input
                    className="uk-checkbox uk-margin-medium-left"
                    type="checkbox"
                    defaultChecked={docIsExternal}
                    onChange={inputChangeHandler.bind(this, 'isExternal')}
                  />
                  External
                </label>
                <label>
                  <input
                    className="uk-checkbox uk-margin-medium-left"
                    type="checkbox"
                    defaultChecked={docHasRecords}
                    onChange={inputChangeHandler.bind(this, 'isHasRecords')}
                  />
                  This document will have records
                </label>
              </div>
              <UserSelect
                title="Select a/multiple Departments to associate the Document"
                selected={selectedDeparts}
                select={setSelectDepart}
                Info={departs}
                setInfo={setDeparts}
                loading={loading}
                toUnFocus={toUnFocus}
                setUnFocus={setUnFocus}
              />
              <Input
                id="name"
                type="text"
                value={docDescription.value}
                control="textarea"
                rows="5"
                placeholder="Insert a Description"
                newInputClasses="uk-form-width-large"
                required={true}
              />
              FALTA O USER DE APROVAÇÃO!!!
              <Button
>>>>>>> cb39da655906000e916bbb11bcb76a712688d234
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
      )}
    </>
  );
}
