import React, { useState, useEffect } from 'react';
import UIkit from 'uikit';

import Button from '../../../components/Button/Button';
import Input from '../../../components/Form/Input/Input';
import Navbar from '../../../components/Navbar/Navbar';
import Loading from '../../../components/Loading/Loading';
import UserSelectOne from '../../../components/UserSelect/UserSelectOne';

import { getAllUserInfo } from '../../../util/restCall_users';
import {
  createDepartment,
  getDepartmentData,
  updateDepart
} from '../../../util/restCall_departs';

import './DepartmentsManagement.css';

export default function DepartmentsManagement(props) {
  console.log(props);
  const [departmentID, setDepartmentID] = useState();
  const [loading, setLoading] = useState(true);
  const [finalDisabled, setFinalDisabled] = useState(false);
  const [respLoading, setRespLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [formDepartmentName, setFormDepartmentName] = useState({ value: '' });
  const [formApprovingUser, setFormApprovingUser] = useState({});
  const [formDescription, setFormDescription] = useState({ value: '' });
  // set[input]()
  const [submitValidation, setSubmitValidation] = useState({
    DepartmentName: false,
    ApprovingUser: false,
    Description: false
  });

  const inputChangeHandler = (input, value) => {
    if (input === 'DepartmentName') {
      setFormDepartmentName((prevState) => {
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
  const submitHandler = async () => {
    const tempObj = {
      ...submitValidation
    };
    const obj = {
      departName: formDepartmentName.value,
      chief_user: formApprovingUser.userID,
      description: formDescription.value
    };
    console.log(tempObj);
    console.log(obj);
    setRespLoading(true);
    let resp;
    if (departmentID !== undefined)
      resp = await updateDepart(departmentID, obj);
    else resp = await createDepartment(obj);
    console.log(resp);
    UIkit.modal.dialog(`<p class="uk-modal-body">${resp.message}</p>`);
    setRespLoading(false);
    if (resp.status === 201 || resp.status === 200) setFinalDisabled(true);
  };
  const getAllUsers = async () => {
    const resp = await getAllUserInfo();
    setUsersList(resp.data);
  };

  const fetchDepartmentData = async () => {
    const id = props.location.state.departmentID;
    setDepartmentID(id);
    let resp = await getDepartmentData(id);
    resp = resp.data.respFind;
    setFormDepartmentName((prevState) => {
      return { value: resp.name };
    });
    let respUsers = await getAllUserInfo();
    setFormApprovingUser((prevState) => {
      const approvingUserData = respUsers.data.find(
        (u) => u.userID === resp.chief_userID
      );
      respUsers = respUsers.data.filter((u) => u.userID !== resp.chief_userID);
      return approvingUserData;
    });
    setUsersList(respUsers);
    setFormDescription((prevState) => {
      return {
        value: resp.description
      };
    });
    setSubmitValidation({
      DepartmentName: true,
      ApprovingUser: true,
      Description: true
    });
  };

  const functionCaller = async () => {
    if (props.location.state !== undefined) await fetchDepartmentData();
    else await getAllUsers();
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
            Department Management
          </h2>
          <div className="profileBox">
            <form onSubmit={(e) => e.preventDefault()}>
              <Input
                id="DepartmentName"
                type="text"
                label="Department name"
                value={formDepartmentName.value}
                onChange={inputChangeHandler}
                control="input"
                rows="5"
                placeholder="Insert a name for the department"
                newInputClasses="uk-form-width-large"
                required={true}
                disabled={finalDisabled}
              />
              <UserSelectOne
                title="Select the department Chief"
                id="DepartmentChief"
                label="Department Chief"
                selected={formApprovingUser}
                select={setFormApprovingUser}
                Info={usersList}
                setInfo={setUsersList}
                // toUnFocus={toUnFocus}
                // setUnFocus={setUnFocus}
                validationField={'ApprovingUser'}
                // setSaveValidation={setSaveValidation}
                setSubmitValidation={setSubmitValidation}
                disabled={finalDisabled}
              />
              <Input
                id="Description"
                type="text"
                label="Department description"
                value={formDescription.value}
                onChange={inputChangeHandler}
                control="textarea"
                rows="5"
                placeholder="Insert a description for the department"
                newInputClasses="uk-form-width-large"
                required={true}
                disabled={finalDisabled}
              />
              <Button
                children="Save"
                newClasses="uk-margin-small-right uk-margin"
                onClick={submitHandler}
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
