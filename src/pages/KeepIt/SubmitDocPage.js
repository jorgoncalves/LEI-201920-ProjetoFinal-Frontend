import React, { useState, useEffect } from 'react';
import UIkit from 'uikit';

import './SubmitDocPage.css';

import Navbar from '../../components/Navbar/Navbar';
import UserSelect from '../../components/UserSelect/UserSelect';
import UserSelectOne from '../../components/UserSelect/UserSelectOne';
import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';

import { getAllUserInfo } from '../../util/restCall_users';
import {
  getDocsUser,
  getAllDepartments,
  getDocDepartPermissions,
  getDocsOnly,
  insertDocument,
  updateDocument,
} from '../../util/restCall_Docs';

import { required } from '../../util/validators';

export default function SubmitDocPage(props) {
  const [userID] = useState(localStorage.getItem('userID'));
  const [loading, setLoading] = useState(true);
  const [respLoading, setRespLoading] = useState(false);
  // const [saveDisabled, setSaveDisabled] = useState(true);
  // const [submitDisabled, setSubmitDisabled] = useState(true);
  const [saveValidation, setSaveValidation] = useState({
    documentName: false,
    file: false,
  });
  const [submitValidation, setSubmitValidation] = useState({
    documentName: false,
    file: false,
    description: false,
    approvingUserList: false,
    selectedUsersRead: false,
    selectedUsersEdit: false,
    selectedDeparts: false,
  });
  const [disabledSelected, setDisabledSelected] = useState(false);
  // const [clicks, setClicks] = useState(0);
  const [userInfo, setUserInfo] = useState();
  const [approvingUserList, setApprovingUserList] = useState([]);
  const [departs, setDeparts] = useState([]);
  // const [toUnFocus, setUnFocus] = useState([]);
  const [selectedUsersRead, setSelectUserRead] = useState([]);
  const [selectedUsersEdit, setSelectUserEdit] = useState([]);
  const [selectedDeparts, setSelectDepart] = useState([]);
  const [docApprovingUserID, setApprovingUserID] = useState({});
  const [docsNameList, setDocsNameList] = useState([]);
  const [docName, setDocName] = useState({ name: '', userID: '' });
  const [docDescription, setDocDescription] = useState({
    value: '',
    valid: false,
    touched: false,
    validators: [required],
  });
  const [docIsPublic, setDocIsPublic] = useState(false);
  const [docIsExternal, setDocIsExternal] = useState(false);
  const [docHasRecords, setDocHasRecords] = useState(true);
  const [docIsModel, setDocIsModel] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [addNew, setAddNew] = useState(false);
  const [finalDisabled, setFinalDisabled] = useState(false);
  // const unfoc = () => {
  //   if (toUnFocus.length > 0 && clicks > 0) {
  //     // document
  //     // .querySelectorAll('.userInputDropdown')
  //     // .forEach((el) => (el.style.display = 'none'));
  //     toUnFocus[0].style.display = 'none';
  //     setUnFocus(toUnFocus.filter((f) => f != toUnFocus[0]));
  //     setClicks(0);
  //   } else {
  //     if (toUnFocus.length > 0) {
  //       setClicks(clicks + 1);
  //     }
  //   }
  // };

  const getAllUsersInfo = async () => {
    let userTemp = await getAllUserInfo();

    setApprovingUserList(userTemp.data);
    // setUserInfo(userTemp.data.filter((u) => u.userID != userID));
    setUserInfo(userTemp.data);
  };

  const getAllDeparts = async () => {
    let allDepartments = await getAllDepartments();
    allDepartments = allDepartments.data.respFind;
    setDeparts([...allDepartments]);
  };

  const getAllDocsInfo = async () => {
    let allDocs = await getDocsOnly(null, ['pending', 'approving'], null);
    allDocs = allDocs.data.documents;
    allDocs = await Promise.all(
      allDocs.map((doc) => {
        return { ...doc, userID: doc.documentID };
      })
    );
    setDocsNameList(allDocs);
  };
  const pendingAllUsersInfo = async () => {
    let userTemp = await getAllUserInfo();

    // setUserInfo(userTemp.data.filter((u) => u.userID != userID));
    // setUserInfo(userTemp.data);
    return userTemp.data;
  };

  const pendingAllDeparts = async () => {
    let allDepartments = await getAllDepartments();
    allDepartments = allDepartments.data.respFind;
    return allDepartments;
  };

  const pendingAllDocsInfo = async () => {
    let allDocs = await getDocsOnly(null, ['pending', 'approving'], null);
    allDocs = allDocs.data.documents;
    allDocs = await Promise.all(
      allDocs.map((doc) => {
        return { ...doc, userID: doc.documentID };
      })
    );
    return allDocs;
  };

  const pendingInfo = async () => {
    let validApprovingUserID = false;
    let validDescription = false;
    let validSelectedDepart = false;
    let validSelectedUsersEdit = false;
    let validSelectedUsersRead = false;
    const documentID = props.location.state.file.documentID;
    const documentName = props.location.state.file.name;
    let documentsPermissions = await getDocsUser(null, null, documentID);
    documentsPermissions = documentsPermissions.data.documents;
    let userInfo = await pendingAllUsersInfo();

    let allDocs = await pendingAllDocsInfo();

    setDocName((prevState) => {
      const tempDoc = allDocs.find((doc) => doc.name === documentName);
      setAddNew(true);
      allDocs = allDocs.filter((doc) => doc.name !== documentName);
      return tempDoc;
    });
    setDocsNameList(allDocs);
    setDisabledSelected(true);
    // setDocName((prevState) => {
    //   return {
    //     ...prevState,
    //     value: props.location.state.file.name,
    //   };
    // });
    // selected={docName}
    // select={setDocName}
    // Info={docsNameList}
    // setInfo={setDocsNameList}

    let tempApprovingUserList = userInfo;
    const approvID = props.location.state.file.approving_userID;
    setApprovingUserID((prevState) => {
      const approvUserData = userInfo.find((u) => u.userID === approvID);

      tempApprovingUserList = tempApprovingUserList.filter(
        (u) => u.userID !== approvID
      );

      return { ...approvUserData };
    });
    setApprovingUserList(tempApprovingUserList);
    if (!approvID !== undefined) validApprovingUserID = true;
    // selected={docApprovingUserID}
    // select={setApprovingUserID}
    // Info={approvingUserList}
    // setInfo={setApprovingUserList}
    userInfo = userInfo.filter((u) => u.userID !== userID);
    const tempUserEditList = [];
    const tempUserReadList = [];
    for (let i = 0; i < documentsPermissions.length; i++) {
      const element = documentsPermissions[i];
      if (element.type_access === 1) {
        const userData = userInfo.find((u) => u.userID === element.userID);

        if (userData !== undefined) tempUserEditList.push(userData);
        if (userData !== undefined)
          userInfo = userInfo.filter((u) => u.userID !== element.userID);
      }

      if (element.type_access === 2) {
        const userData = userInfo.find((u) => u.userID === element.userID);

        if (userData !== undefined) tempUserReadList.push(userData);
        if (userData !== undefined)
          userInfo = userInfo.filter((u) => u.userID !== element.userID);
      }
    }
    setSelectUserEdit(tempUserEditList);
    setSelectUserRead(tempUserReadList);
    if (tempUserEditList.length > 0) validSelectedUsersEdit = true;
    if (tempUserReadList.length > 0) validSelectedUsersRead = true;

    setUserInfo(userInfo.filter((u) => u.userID !== userID));
    let docDepartPermissions = await getDocDepartPermissions(documentID);
    let allDeparts = await pendingAllDeparts();
    docDepartPermissions = docDepartPermissions.data.docPermisions;
    setSelectDepart((prevState) => {
      const oldSelectedDeparts = docDepartPermissions.map((perm) => perm);
      const departsData = oldSelectedDeparts.map((department) => {
        const temp = allDeparts.find(
          (depart) => depart.departmentID === department.departmentID
        );
        allDeparts = allDeparts.filter(
          (depart) => depart.departmentID !== department.departmentID
        );
        return temp;
      });

      const updatedDeparts = [...prevState, ...departsData];

      return updatedDeparts;
    });

    if (docDepartPermissions.length > 0) validSelectedDepart = true;
    setDeparts(allDeparts);
    // clean up dos departamentos já selecionados

    setDocIsPublic(props.location.state.file.is_public);
    setDocIsExternal(props.location.state.file.is_external);
    setDocHasRecords(props.location.state.file.has_records);
    setDocIsModel(props.location.state.file.isModelFile);

    setDocDescription((prevState) => {
      return {
        ...prevState,
        value: props.location.state.file.description,
      };
    });
    if (
      props.location.state.file.description !== undefined &&
      props.location.state.file.description !== ''
    )
      validDescription = true;
    setSaveValidation({
      documentName: true,
      file: true,
    });
    setSubmitValidation((prevState) => {
      return {
        documentName: true,
        file: true,
        description: validDescription,
        approvingUserList: validApprovingUserID,
        selectedUsersRead: validSelectedUsersRead,
        selectedUsersEdit: validSelectedUsersEdit,
        selectedDeparts: validSelectedDepart,
      };
    });
  };

  const functionsCallers = async () => {
    if (
      props.location.state !== undefined &&
      props.location.state.from === '/penDocs'
    )
      await pendingInfo();
    else {
      await getAllDeparts();
      await getAllUsersInfo();
      await getAllDocsInfo();
    }
    setLoading(false);
  };

  useEffect(() => {
    functionsCallers();

    return () => {
      setLoading(false);
    };
  }, []);

  const inputChangeHandlerBool = (input, e) => {
    if (input === 'isPublic') setDocIsPublic(e.target.checked);
    if (input === 'isExternal') setDocIsExternal(e.target.checked);
    if (input === 'isHasRecords') setDocHasRecords(e.target.checked);
    if (input === 'isModel') setDocIsModel(e.target.checked);
  };

  const inputChangeHandler = (input, value, addNew) => {
    console.log();

    if (input === 'name' && !addNew) {
      setDocName({ name: value });
      let valide = false;
      if (value !== '') valide = true;

      setSaveValidation((prevState) => {
        return { ...prevState, documentName: valide };
      });
      setSubmitValidation((prevState) => {
        return { ...prevState, documentName: valide };
      });
    } else if (input === 'name') {
      setDocName((prevState) => {
        // validação
        return { ...prevState, name: value };
      });
      let valide = false;
      if (value !== '') valide = true;
      setSaveValidation((prevState) => {
        return { ...prevState, documentName: valide };
      });
      setSubmitValidation((prevState) => {
        return { ...prevState, documentName: valide };
      });
    }
    if (input === 'description') {
      setDocDescription((prevState) => {
        // validação
        return { ...prevState, value: value };
      });
      let valide = false;
      if (value !== '') valide = true;
      setSubmitValidation((prevState) => {
        return { ...prevState, description: valide };
      });
    }
  };

  const inputFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setSaveValidation((prevState) => {
      return { ...prevState, file: true };
    });
    setSubmitValidation((prevState) => {
      return { ...prevState, file: true };
    });
  };

  const submitHandler = async (status) => {
    //verificar que o form está preenchido.
    const obj = {
      name: docName.name,
      isModelFile: docIsModel,
      has_records: docHasRecords,
      status: status,
      description: docDescription.value,
      is_public: docIsPublic,
      is_external: docIsExternal,
      editUsersList: JSON.stringify(
        selectedUsersEdit.map((user) => user.userID)
      ),
      consultUsersList: JSON.stringify(
        selectedUsersRead.map((user) => user.userID)
      ),
      departmentList: JSON.stringify(
        selectedDeparts.map((depart) => depart.departmentID)
      ),
      fileMulter: selectedFile,
    };
    if (docApprovingUserID.userID !== undefined)
      obj.approving_userID = docApprovingUserID.userID;
    function getFormData(object) {
      const formData = new FormData();
      Object.keys(object).forEach((key) => formData.append(key, object[key]));
      return formData;
    }
    setRespLoading(true);
    let resp;
    if (
      props.location.state !== undefined &&
      props.location.state.from === '/penDocs'
    )
      resp = await updateDocument(
        props.location.state.file.documentID,
        getFormData(obj)
      );
    else resp = await insertDocument(userID, getFormData(obj));
    console.log(resp);
    UIkit.modal.dialog(`<p class="uk-modal-body">${resp.message}</p>`);
    setRespLoading(false);
    if (resp.status === 201 || resp.status === 200) setFinalDisabled(true);
  };

  return (
    <>
      <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
      {loading ? (
        <Loading />
      ) : (
        <div className="profileBox">
          <h2 className="uk-heading-divider uk-margin-medium-bottom">
            Submit new File
          </h2>
          <div className="profileBox">
            <form onSubmit={(e) => e.preventDefault()}>
              <UserSelectOne
                title="Insert a Name for the Documentation"
                id="name"
                label="Document name"
                selected={docName}
                select={setDocName}
                Info={docsNameList}
                setInfo={setDocsNameList}
                onChange={inputChangeHandler}
                // toUnFocus={toUnFocus}
                // setUnFocus={setUnFocus}
                addNew={addNew}
                setAddNew={setAddNew}
                value={docName.name}
                validationField="documentName"
                setSaveValidation={setSaveValidation}
                setSubmitValidation={setSubmitValidation}
                disabledSelected={disabledSelected}
                finalDisabled={finalDisabled}
              />
              {/* <Input
                id="name"
                type="text"
                value={docName.value}
                control="input"
                label="Document name"
                onChange={inputChangeHandler}
                placeholder="Insert a Name for the Documentation"
                newInputClasses="uk-form-width-large"
                required={true}
              /> */}
              <div className="uk-margin">
                {/* <label
                  className="uk-form-label uk-text-emphasis"
                  htmlFor="file"
                >
                  Document
                </label> */}
                <div className="uk-form-controls" uk-form-custom="target: true">
                  <input
                    type="file"
                    className="uk-input"
                    id="file"
                    disabled={
                      (props.location.state !== undefined &&
                        props.location.state.from === '/penDocs') ||
                      finalDisabled
                    }
                    onChange={inputFileHandler.bind(this)}
                  />
                  <input
                    className="uk-input uk-form-width-large"
                    type="text"
                    placeholder="Select file"
                    disabled={
                      (props.location.state !== undefined &&
                        props.location.state.from === '/penDocs') ||
                      finalDisabled
                    }
                  />
                </div>
                <label>
                  <input
                    className="uk-checkbox uk-margin-medium-left"
                    type="checkbox"
                    defaultChecked={docIsModel}
                    onChange={inputChangeHandlerBool.bind(this, 'isModel')}
                    disabled={finalDisabled}
                  />
                  This document has a model document
                </label>
              </div>
              <UserSelect
                title="Select a/multiple Departments to associate the Document"
                id="associatedDeparts"
                label="Departments associated"
                selected={selectedDeparts}
                select={setSelectDepart}
                Info={departs}
                setInfo={setDeparts}
                // toUnFocus={toUnFocus}
                // setUnFocus={setUnFocus}
                validationField={'selectedDeparts'}
                setSubmitValidation={setSubmitValidation}
                disabled={finalDisabled}
              />
              <UserSelectOne
                title="Select the user who will approve the document"
                id="approvingUser"
                label="Approving user"
                selected={docApprovingUserID}
                select={setApprovingUserID}
                Info={approvingUserList}
                setInfo={setApprovingUserList}
                // toUnFocus={toUnFocus}
                // setUnFocus={setUnFocus}
                validationField={'approvingUserList'}
                setSaveValidation={setSaveValidation}
                setSubmitValidation={setSubmitValidation}
                disabled={finalDisabled}
              />
              <UserSelect
                title="Select Users to Edit the Document"
                id="usersEdit"
                label="Users with editing permission"
                selected={selectedUsersEdit}
                select={setSelectUserEdit}
                Info={userInfo}
                setInfo={setUserInfo}
                // toUnFocus={toUnFocus}
                // setUnFocus={setUnFocus}
                validationField={'selectedUsersEdit'}
                setSubmitValidation={setSubmitValidation}
                disabled={finalDisabled}
              />
              <UserSelect
                title="Select Users to Access the Document"
                id="accessEdit"
                label="Users with access permission"
                selected={selectedUsersRead}
                select={setSelectUserRead}
                Info={userInfo}
                setInfo={setUserInfo}
                // toUnFocus={toUnFocus}
                // setUnFocus={setUnFocus}
                validationField={'selectedUsersRead'}
                setSubmitValidation={setSubmitValidation}
                disabled={finalDisabled}
              />
              <Input
                id="description"
                type="text"
                label="Document description"
                value={docDescription.value}
                onChange={inputChangeHandler}
                control="textarea"
                rows="5"
                placeholder="Insert a Description"
                newInputClasses="uk-form-width-large"
                required={true}
                disabled={finalDisabled}
              />
              <div className="uk-margin">
                <label>
                  <input
                    className="uk-checkbox uk-margin-small-left"
                    type="checkbox"
                    defaultChecked={docIsPublic}
                    onChange={inputChangeHandlerBool.bind(this, 'isPublic')}
                    disabled={finalDisabled}
                  />
                  Public
                </label>
                <label>
                  <input
                    className="uk-checkbox uk-margin-medium-left"
                    type="checkbox"
                    defaultChecked={docIsExternal}
                    onChange={inputChangeHandlerBool.bind(this, 'isExternal')}
                    disabled={finalDisabled}
                  />
                  External
                </label>
                <label>
                  <input
                    className="uk-checkbox uk-margin-medium-left"
                    type="checkbox"
                    defaultChecked={docHasRecords}
                    onChange={inputChangeHandlerBool.bind(this, 'isHasRecords')}
                    disabled={finalDisabled}
                  />
                  This document will have records
                </label>
              </div>
              <Button
                children="Save"
                newClasses="uk-margin-small-right"
                onClick={submitHandler.bind(this, 'pending')}
                loading={respLoading}
                disabled={
                  !Object.keys(saveValidation).every(
                    (el) => saveValidation[el]
                  ) || finalDisabled
                }
              />
              <Button
                children="Submit"
                newClasses="uk-margin-small-left"
                onClick={submitHandler.bind(this, 'forapproval')}
                loading={respLoading}
                disabled={
                  !Object.keys(submitValidation).every(
                    (el) => submitValidation[el]
                  ) || finalDisabled
                }
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
