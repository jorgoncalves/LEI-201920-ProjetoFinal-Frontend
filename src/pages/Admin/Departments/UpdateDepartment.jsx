import React, { useState, useEffect } from 'react';

import Navbar from '../../../components/Navbar/Navbar';
import Loading from '../../../components/Loading/Loading';
import Button from '../../../components/Button/Button';
// import Input from '../../../components/Form/Input/Input';
import UserSelectOne from '../../../components/UserSelect/UserSelectOne';

import { getAllDepartments } from '../../../util/restCall_Docs';

import './DepartmentsManagement.css';

export default function UpdateDepartment(props) {
  const [loading, setLoading] = useState(true);
  // const [finalDisabled, setFinalDisabled] = useState(false);
  // const [respLoading, setRespLoading] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [formDepartment, setFormDepartment] = useState({});
  const [submitValidation, setSubmitValidation] = useState({
    Department: false
  });

  const getAllDeparts = async () => {
    const obj = {};
    let allDepartments = await getAllDepartments(obj);
    const tempAllDepartments = [];
    for await (const depart of allDepartments.data.respFind) {
      tempAllDepartments.push({ ...depart, userID: depart.departmentID });
    }

    setDepartmentsList(tempAllDepartments);
  };

  const functionCaller = async () => {
    await getAllDeparts();
    setLoading(false);
  };

  // const submitHandler = async () => {
  // const tempObj = {
  //   ...submitValidation,
  // };
  // const obj = {
  //   departName: formDepartment.name,
  // };
  // console.log(tempObj);
  // console.log(obj);
  // setRespLoading(true);
  // const resp = await createDepartment(obj);
  // console.log(resp);
  // UIkit.modal.dialog(`<p class="uk-modal-body">${resp.message}</p>`);
  // setRespLoading(false);
  // if (resp.status === 201 || resp.status === 200) setFinalDisabled(true);
  // };

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
            Update Department
          </h2>
          <div className="profileBox">
            <UserSelectOne
              title="Select a department to update"
              id="Department"
              label="Department to update"
              selected={formDepartment}
              select={setFormDepartment}
              Info={departmentsList}
              setInfo={setDepartmentsList}
              validationField={'Department'}
              setSubmitValidation={setSubmitValidation}
              addNew={addNew}
              setAddNew={setAddNew}
              // disabled={finalDisabled}
            />
            {!Object.keys(submitValidation).every(
              (el) => submitValidation[el]
            ) ? (
              <Button
                children="Update"
                newClasses="uk-margin-small-right"
                disabled={true}
              />
            ) : (
              <Button
                children="Update"
                newClasses="uk-margin-small-right"
                // onClick={submitHandler}
                // loading={respLoading}
                link={{
                  pathname: '/departmentsmanagement',
                  state: { departmentID: formDepartment.departmentID }
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
