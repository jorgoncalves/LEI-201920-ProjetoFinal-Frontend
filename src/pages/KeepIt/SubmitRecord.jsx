import React, { useState, useEffect } from 'react';
import UIkit from 'uikit';

import Button from '../../components/Button/Button';
import Input from '../../components/Form/Input/Input';
import Navbar from '../../components/Navbar/Navbar';
import Loading from '../../components/Loading/Loading';
import UserSelectOne from '../../components/UserSelect/UserSelectOne';

import './SubmitRecord.css';

import { getDocsOnly } from '../../util/restCall_Docs';
import { postRecordData } from '../../util/restCall_records';

export default function SubmitRecord(props) {
  const [userID] = useState(localStorage.getItem('userID'));
  const [loading, setLoading] = useState(true);
  const [finalDisabled, setFinalDisabled] = useState(false);
  // const [disabled, setDisabled] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [respLoading, setRespLoading] = useState(false);
  const [documentsList, setDocumentsList] = useState([]);
  const [formDocumentName, setFormDocumentName] = useState({
    name: '',
    userID: ''
  });
  const [formDescription, setFormDescription] = useState({ value: '' });
  const [formSelectedFile, setFormSelectedFile] = useState();
  // const [formTagAno, setFormTagAno] = useState({ value: '' });
  const [formTagCliente, setFormTagCliente] = useState({ value: '' });
  const [formTagNIF, setFormTagNIF] = useState({ value: '' });
  const [formTagCategoria, setFormTagCategoria] = useState({ value: '' });
  const [submitValidation, setSubmitValidation] = useState({
    DocumentName: false,
    Description: false,
    Files: false
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

  const inputFileHandler = async (e) => {
    console.log(e.target.files);

    setFormSelectedFile(e.target.files);
    setSubmitValidation((prevState) => {
      return { ...prevState, Files: true };
    });
  };

  const inputChangeHandler = (input, value) => {
    // console.log(input, value);

    if (input === 'DocumentName') {
      setFormDocumentName((prevState) => {
        return { ...prevState, value: value };
      });
    }
    // if (input === 'TagAno') {
    //   setFormTagAno((prevState) => {
    //     return { ...prevState, value: value };
    //   });
    // }
    if (input === 'TagCliente') {
      setFormTagCliente((prevState) => {
        return { ...prevState, value: value };
      });
    }
    if (input === 'TagNIF') {
      setFormTagNIF((prevState) => {
        return { ...prevState, value: value };
      });
    }
    if (input === 'TagCategoria') {
      setFormTagCategoria((prevState) => {
        return { ...prevState, value: value };
      });
    }
    if (input === 'Description') {
      setFormDescription((prevState) => {
        return { ...prevState, value: value };
      });
    }
    let valide = false;
    if (value !== '') valide = true;
    setSubmitValidation((prevState) => {
      return { ...prevState, [input]: valide };
    });
  };

  const saveHandler = async () => {
    const obj = {
      documentID: formDocumentName.documentID,
      submitted_by_UserID: userID,
      // tagAno,
      tagCliente: formTagCliente.value,
      tagNIF: formTagNIF.value,
      tagCategoria: formTagCategoria.value,
      description: formDescription.value
    };

    const getFormData = (object) => {
      const formData = new FormData();

      for (const key of Object.keys(formSelectedFile)) {
        formData.append('fileArrMulter', formSelectedFile[key]);
      }

      Object.keys(object).forEach((key) => formData.append(key, object[key]));
      return formData;
    };

    setRespLoading(true);
    let resp = await postRecordData(getFormData(obj));
    UIkit.modal.dialog(`<p class="uk-modal-body">${resp.message}</p>`);
    setRespLoading(false);
    if (resp.status === 201 || resp.status === 200) setFinalDisabled(true);
  };
  const functionCaller = async () => {
    await getAllDocs(); //getdocs
    setLoading(false);
  };
  useEffect(() => {
    functionCaller();
  }, []);
  return (
    <>
      <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
      {loading ? (
        <Loading />
      ) : (
        <div className="profileBox">
          <h2 className="uk-heading-divider uk-margin-medium-bottom">
            Record submission
          </h2>
          <div className="profileBox">
            <UserSelectOne
              title="Select the document name"
              id="DocumentName"
              label="Document name"
              selected={formDocumentName}
              select={setFormDocumentName}
              Info={documentsList}
              setInfo={setDocumentsList}
              onChange={inputChangeHandler}
              addNew={addNew}
              setAddNew={setAddNew}
              validationField="DocumentName"
              setSubmitValidation={setSubmitValidation}
              disabled={finalDisabled}
            />
            <div className="uk-form-controls" uk-form-custom="target: true">
              <input
                type="file"
                className="uk-input"
                id="Files"
                disabled={finalDisabled}
                multiple
                onChange={inputFileHandler.bind(this)}
              />
              <input
                className="uk-input uk-form-width-large"
                type="text"
                placeholder="Select file"
                disabled
              />
            </div>
            <div className="uk-margin uk-form-width-large" uk-grid="true">
              {/* <div className="uk-width-1-4@s">
                <Input
                  id="TagAno"
                  type="number"
                  label="Year Tag"
                  value={formTagAno.value}
                  onChange={inputChangeHandler}
                  control="input"
                  placeholder="Insert an Year Tag (Optional)"
                  // newInputClasses="uk-form-width-large"
                  required={true}
                  disabled={finalDisabled}
                />
              </div> */}
              <div className="uk-width-1-2@s customTag">
                <Input
                  id="TagCliente"
                  type="text"
                  label="Client Tag (Optional)"
                  value={formTagCliente.value}
                  onChange={inputChangeHandler}
                  control="input"
                  placeholder="Insert an Client Tag"
                  newInputClasses="uk-form-width"
                  required={true}
                  disabled={finalDisabled}
                />
              </div>
              <div className="uk-width-1-2@s customTag">
                <Input
                  id="TagNIF"
                  type="number"
                  label="VAT Tag (Optional)"
                  value={formTagNIF.value}
                  onChange={inputChangeHandler}
                  control="input"
                  placeholder="Insert an VAT Tag (Optional)"
                  // newInputClasses="uk-form-width-large"
                  required={true}
                  disabled={finalDisabled}
                />
              </div>
              <div className="uk-width-1-2@s customTag">
                <Input
                  id="TagCategoria"
                  type="text"
                  label="Category Tag (Optional)"
                  value={formTagCategoria.value}
                  onChange={inputChangeHandler}
                  control="input"
                  placeholder="Insert an Category Tag (Optional)"
                  newInputClasses="uk-form-width"
                  required={true}
                  disabled={finalDisabled}
                />
              </div>
            </div>
            <Input
              id="Description"
              type="text"
              label="Record description"
              value={formDescription.value}
              onChange={inputChangeHandler}
              control="textarea"
              rows="5"
              placeholder="Insert a Description"
              newInputClasses="uk-form-width-large"
              required={true}
              disabled={finalDisabled}
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
      )}
    </>
  );
}
