import React, { useState, useEffect } from 'react';
import UIkit from 'uikit';

import Button from '../../../components/Button/Button';
import Input from '../../../components/Form/Input/Input';
import Navbar from '../../../components/Navbar/Navbar';
import Loading from '../../../components/Loading/Loading';
import UserSelectOne from '../../../components/UserSelect/UserSelectOne';
import InputCheckOrRadio from '../../../components/Form/Input/InputCheckOrRadio';

import './DocLocation.css';

import { getDocsOnly } from '../../../util/restCall_Docs';
import {
  getCurrentDocsLocations,
  postNewDocLocation,
  removeDocLocation
} from '../../../util/restCall_DocLocation';

export default function DocLocation(props) {
  const [userID] = useState(localStorage.getItem('userID'));
  const [loading, setLoading] = useState(true);
  const [finalDisabled, setFinalDisabled] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [disabledLocal, setDisabledLocal] = useState(false);
  const [addNewOldDocs, setAddNewOldDocs] = useState(false);
  const [addNewNewDos, setAddNewNewDos] = useState(false);
  const [respLoading, setRespLoading] = useState(false);
  const [documentLocationList, setDocumentLocationList] = useState([]);
  const [documentsList, setDocumentsList] = useState([]);
  const [formShowOldDocumentRenew, setFormShowOldDocumentRenew] = useState(
    false
  );
  const [formShowOldDocumentRemove, setFormShowOldDocumentRemove] = useState(
    false
  );
  const [formOldDocumentName, setFormOldDocumentName] = useState({
    name: '',
    userID: ''
  });
  const [formNewDocumentName, setFormNewDocumentName] = useState({
    name: '',
    userID: ''
  });
  const [formLocal, setFormLocal] = useState({ value: '' });
  const [formStatus, setFormStatus] = useState({ value: '' });
  const [submitValidation, setSubmitValidation] = useState({
    NewDocumentName: false,
    Local: false,
    Status: false
  });
  const getAllDocs = async () => {
    // const userID = localStorage.getItem('userID');
    let allDocs = await getDocsOnly(false, 'approved');
    const tempAllDocs = [];
    for await (const depart of allDocs.data.documents) {
      tempAllDocs.push({ ...depart, userID: depart.documentID });
    }
    setDocumentsList(tempAllDocs);
  };

  const getDocsLocations = async () => {
    const allDocsLocations = await getCurrentDocsLocations(false, 'New', null);
    const tempAllLocations = [];
    for await (const location of allDocsLocations.data.docsLocations) {
      tempAllLocations.push({
        ...location,
        userID: location.id,
        name: location.documentID_newName
      });
    }
    setDocumentLocationList(tempAllLocations);
  };

  const inputChangeHandler = (input, value) => {
    // console.log(input, value);

    // if (input === 'OldDocumentName') {
    //   setFormOldDocumentName((prevState) => {
    //     return { ...prevState, value: value };
    //   });
    // }
    // if (input === 'NewDocumentName') {
    //   setFormNewDocumentName((prevState) => {
    //     return { ...prevState, value: value };
    //   });
    // }
    if (input === 'Local') {
      setFormLocal((prevState) => {
        return { ...prevState, value: value };
      });
    }
    if (input.includes('Status')) {
      setDocumentLocationList((prevState) => {
        if (formOldDocumentName.name !== '')
          return [...prevState, formOldDocumentName];
        else return [...prevState];
      });
      setAddNewOldDocs(false);
      setFormOldDocumentName({
        name: '',
        userID: ''
      });
      setAddNewNewDos(false);
      setDocumentsList((prevState) => {
        if (formNewDocumentName.name !== '')
          return [...prevState, formNewDocumentName];
        else return [...prevState];
      });
      setFormNewDocumentName({
        name: '',
        userID: ''
      });
      setFormStatus((prevState) => {
        return { ...prevState, value: value };
      });
      if (input !== 'StatusNew') {
        if (input === 'StatusRenewed') {
          setFormShowOldDocumentRenew(true);
          setFormShowOldDocumentRemove(false);
          setFormLocal({ value: '' });
          setDisabledLocal(false);
          setSubmitValidation((prevState) => {
            prevState.NewDocumentName = false;
            prevState.OldDocumentName = false;
            prevState.Local = false;
            return prevState;
          });
        }
        if (input === 'StatusRemoved') {
          setFormShowOldDocumentRemove(true);
          setFormShowOldDocumentRenew(false);
          setFormLocal({ value: '' });
          setDisabledLocal(true);
          setSubmitValidation((prevState) => {
            prevState.OldDocumentName = false;
            delete prevState.NewDocumentName;
            delete prevState.Local;
            return prevState;
          });
        }
      } else {
        setFormShowOldDocumentRenew(false);
        setFormShowOldDocumentRemove(false);
        setFormLocal({ value: '' });
        setDisabledLocal(false);
        setSubmitValidation((prevState) => {
          prevState.NewDocumentName = false;
          prevState.Local = false;
          delete prevState.OldDocumentName;
          return prevState;
        });
      }
    }
    let valide = false;
    if (value !== '' && !input.includes('Status')) {
      valide = true;
    } else if (input.includes('Status')) {
      setDisabled(false);
      input = 'Status';
      valide = true;
    }
    setSubmitValidation((prevState) => {
      return { ...prevState, [input]: valide };
    });
  };

  const saveHandler = async () => {
    const objNew = {
      userID: userID,
      documentID_new: formNewDocumentName.documentID,
      local: formLocal.value,
      status: formStatus.value
    };
    const objRenew = {
      ...objNew,
      locationID: formOldDocumentName.id,
      documentID_old: formOldDocumentName.documentID_new
    };

    const objRemove = {
      locationID: formOldDocumentName.id,
      status: formStatus.value
    };

    console.log(objNew);
    console.log(objRenew);
    console.log(objRemove);

    let resp;

    setRespLoading(true);
    if (formStatus.value === 'New') resp = await postNewDocLocation(objNew);
    if (formStatus.value === 'Renewed') resp = await postNewDocLocation(objRenew);
    if (formStatus.value === 'Removed')
      resp = await removeDocLocation(objRemove.locationID, objRemove);
    UIkit.modal.dialog(`<p class="uk-modal-body">${resp.message}</p>`);
    setRespLoading(false);
    if (resp.status === 201 || resp.status === 200) setFinalDisabled(true);
  };
  const functionCaller = async () => {
    await getAllDocs();
    await getDocsLocations();
    setLoading(false);
  };
  useEffect(() => {
    functionCaller();
  }, []);
  useEffect(() => {
    if (formStatus.value === 'Removed' && formOldDocumentName.name !== '') {
      setFormLocal({ value: formOldDocumentName.local });
    } else if (formStatus.value === 'Removed') {
      setFormLocal({ value: '' });
    }
  }, [formOldDocumentName]);
  return (
    <>
      <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="profileBox">
            <h2 className="uk-heading-divider uk-margin-medium-bottom">
              Document Location
            </h2>
            <div className="profileBox">
              <div className="uk-margin uk-form-width-large" uk-grid="true">
                <div className="uk-width-1-3@s customTag">
                  <InputCheckOrRadio
                    id="StatusNew"
                    name="StatusNew"
                    type="radio"
                    label="New location"
                    value="New"
                    onChange={inputChangeHandler}
                    control="input"
                    // required={true}
                    disabled={finalDisabled}
                  />
                </div>
                <div className="uk-width-1-3@s customTag">
                  <InputCheckOrRadio
                    id="StatusRemoved"
                    name="StatusNew"
                    type="radio"
                    label="Removed"
                    value="Removed"
                    onChange={inputChangeHandler}
                    control="input"
                    disabled={finalDisabled}
                  />
                </div>
                <div className="uk-width-1-3@s customTag">
                  <InputCheckOrRadio
                    id="StatusRenewed"
                    name="StatusNew"
                    type="radio"
                    label="Renew"
                    value="Renewed"
                    onChange={inputChangeHandler}
                    control="input"
                    disabled={finalDisabled}
                  />
                </div>
              </div>
              {(formShowOldDocumentRenew || formShowOldDocumentRemove) && (
                <UserSelectOne
                  title="Select the old document name"
                  id="OldDocumentName"
                  label="Old Document name"
                  selected={formOldDocumentName}
                  select={setFormOldDocumentName}
                  Info={documentLocationList}
                  setInfo={setDocumentLocationList}
                  onChange={inputChangeHandler}
                  addNew={addNewOldDocs}
                  setAddNew={setAddNewOldDocs}
                  validationField="OldDocumentName"
                  setSubmitValidation={setSubmitValidation}
                  disabled={finalDisabled || disabled}
                />
              )}
              {!formShowOldDocumentRemove && (
                <UserSelectOne
                  title="Select the new document name"
                  id="NewDocumentName"
                  label="New Document name"
                  selected={formNewDocumentName}
                  select={setFormNewDocumentName}
                  Info={documentsList}
                  setInfo={setDocumentsList}
                  onChange={inputChangeHandler}
                  addNew={addNewNewDos}
                  setAddNew={setAddNewNewDos}
                  validationField="NewDocumentName"
                  setSubmitValidation={setSubmitValidation}
                  disabled={finalDisabled || disabled}
                />
              )}
              <Input
                id="Local"
                type="text"
                label="Location"
                value={formLocal.value}
                onChange={inputChangeHandler}
                control="textarea"
                rows="5"
                placeholder="Insert the physical document location"
                newInputClasses="uk-form-width-large"
                required={true}
                disabled={finalDisabled || disabled || disabledLocal}
              />
              <Button
                children="Save"
                newClasses=""
                onClick={saveHandler}
                loading={respLoading}
                disabled={
                  !Object.keys(submitValidation).every(
                    (el) => submitValidation[el]
                  ) || finalDisabled
                }
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
