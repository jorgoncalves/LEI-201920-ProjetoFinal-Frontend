import React, { useState, useEffect } from 'react';
import UIkit from 'uikit';

import Button from '../../../components/Button/Button';
import Input from '../../../components/Form/Input/Input';
import Navbar from '../../../components/Navbar/Navbar';
import Loading from '../../../components/Loading/Loading';
import UserSelect from '../../../components/UserSelect/UserSelect';

import './UsersManagement.css';

import { getAllDepartments } from '../../../util/restCall_Docs';
import {
  getCountriesList,
  getUserInfo,
  updateClient,
  createClient
} from '../../../util/restCall_users';

export default function UsersManagement(props) {
  const [userIDUpdate, setUserIDUpdate] = useState();
  const [loading, setLoading] = useState(true);
  const [finalDisabled, setFinalDisabled] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [respLoading, setRespLoading] = useState(false);
  const [formName, setFormName] = useState({ value: '' });
  const [formEmail, setFormEmail] = useState({ value: '' });
  const [formDepartment, setFormDepartment] = useState([]);
  const [formCountry, setFormCountry] = useState({ value: '' });
  const [formCountryCode, setFormCountryCode] = useState({ value: '' });
  const [formPhoneNumber, setFormPhoneNumber] = useState({ value: '' });
  const [departmentsList, setDepartmentsList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [submitValidation, setSubmitValidation] = useState({
    Name: false,
    Email: false,
    Department: false,
    Country: false,
    CountryCode: false,
    PhoneNumber: false
  });
  const getAllDeparts = async () => {
    let allDepartments = await getAllDepartments();
    allDepartments = await Promise.all(
      allDepartments.data.respFind.map((depart) => {
        return { ...depart, userID: depart.departmentID };
      })
    );
    setDepartmentsList(allDepartments);
  };

  const getCountries = async () => {
    let resp = await getCountriesList();
    if (resp.status !== 500) {
      let countries = [];

      await resp.forEach((element) => {
        countries.push(element.translations.pt);
      });
      countries.push('');
      setCountriesList(countries);
    } else {
      setCountriesList([`${resp.error}`]);
    }
  };

  const fetchUserData = async () => {
    const id = props.location.state.userID;
    setUserIDUpdate(id);
    let resp = await getUserInfo(id);
    console.log("fetch");
    
    let userDepartList = resp.department.map((depart) => depart.trim());
    console.log(resp);
    setFormName((prevState) => {
      return {
        value: resp.name
      };
    });
    setFormEmail((prevState) => {
      return {
        value: resp.email
      };
    });
    setDisabled(true);
    let allDepartments = await getAllDepartments();
    allDepartments = await Promise.all(
      allDepartments.data.respFind.map((depart) => {
        return { ...depart, userID: depart.departmentID };
      })
    );

    const userDepartmentList = allDepartments.filter((depart) =>
      userDepartList.includes(depart.name)
    );

    allDepartments = allDepartments.filter(
      (depart) => !userDepartList.includes(depart.name)
    );

    setDepartmentsList(allDepartments);
    setFormDepartment((prevState) => {
      return userDepartmentList;
    });
    setFormCountry((prevState) => {
      return {
        value: resp.country
      };
    });
    setFormCountryCode((prevState) => {
      return {
        value: resp.country_code
      };
    });
    setFormPhoneNumber((prevState) => {
      return {
        value: resp.phone_number
      };
    });
    setSubmitValidation({
      Name: true,
      Email: true,
      Department: true,
      Country: true,
      CountryCode: true,
      PhoneNumber: true
    });
  };

  const inputChangeHandler = (input, value) => {
    console.log(input, value);

    if (input === 'Name') {
      setFormName((prevState) => {
        // validação
        return { ...prevState, value: value };
      });
    }
    if (input === 'Email') {
      setFormEmail((prevState) => {
        // validação
        return { ...prevState, value: value };
      });
    }
    if (input === 'Country') {
      setFormCountry((prevState) => {
        // validação
        return { ...prevState, value: value };
      });
    }
    if (input === 'CountryCode') {
      setFormCountryCode((prevState) => {
        // validação
        return { ...prevState, value: value };
      });
    }
    if (input === 'PhoneNumber') {
      setFormPhoneNumber((prevState) => {
        // validação
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
    const obj = {
      name: formName.value,
      email: formEmail.value, //apenas é relevante em caso de insert
      departmentList: formDepartment,
      deleteFromDepart: departmentsList,
      country: formCountry.value,
      country_code: formCountryCode.value,
      phone_number: formPhoneNumber.value,
      password: 12345
    };
    console.log(obj);

    setRespLoading(true);
    let resp;
    if (userIDUpdate !== undefined)
      resp = await updateClient(userIDUpdate, obj);
    else resp = await createClient(obj);
    console.log(resp);
    UIkit.modal.dialog(`<p class="uk-modal-body">${resp.message}</p>`);
    setRespLoading(false);
    if (resp.status === 201 || resp.status === 200) setFinalDisabled(true);
  };
  const functionCaller = async () => {
    await getCountries();
    if (props.location.state !== undefined) await fetchUserData();
    else await getAllDeparts();
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
            User Management
          </h2>
          <div className="profileBox">
            <Input
              id="Name"
              type="text"
              label="User name"
              value={formName.value}
              onChange={inputChangeHandler}
              control="input"
              rows="5"
              placeholder="Insert a name for the user"
              newInputClasses="uk-form-width-large"
              required={true}
              disabled={finalDisabled}
            />
            <Input
              id="Email"
              type="email"
              label="User email"
              value={formEmail.value}
              onChange={inputChangeHandler}
              control="input"
              rows="5"
              placeholder="Insert a email for the user"
              newInputClasses="uk-form-width-large"
              required={true}
              disabled={finalDisabled || disabled}
            />
            <UserSelect
              title="Select the department "
              id="DepartmentChief"
              label="Department"
              selected={formDepartment}
              select={setFormDepartment}
              Info={departmentsList}
              setInfo={setDepartmentsList}
              validationField={'Department'}
              setSubmitValidation={setSubmitValidation}
              disabled={finalDisabled}
              userIDUpdate={userIDUpdate}
            />
            <Input
              id="Country"
              type="select"
              label="User country"
              value={formCountry.value}
              onChange={inputChangeHandler}
              control="select"
              placeholder="Select the user country"
              newDivClasses="uk-form-width-large"
              disabled={finalDisabled}
              required={true}
              options={countriesList}
            />
            <div
              className="uk-grid-small uk-margin uk-form-width-large"
              uk-grid="true"
            >
              <div className="uk-width-1-4@s">
                <Input
                  id="CountryCode"
                  type="number"
                  label="Country Code"
                  value={formCountryCode.value}
                  onChange={inputChangeHandler}
                  control="input"
                  rows="5"
                  placeholder="Insert the user country code"
                  // newInputClasses="uk-form-width-large"
                  required={true}
                  disabled={finalDisabled}
                />
              </div>
              <div>
                <Input
                  id="PhoneNumber"
                  type="number"
                  label="Phone Number"
                  value={formPhoneNumber.value}
                  onChange={inputChangeHandler}
                  control="input"
                  rows="5"
                  placeholder="Insert the user phone number"
                  newInputClasses="uk-form-width"
                  required={true}
                  disabled={finalDisabled}
                />
              </div>
            </div>
            <Button
              children="Save"
              newClasses=""
              onClick={submitHandler}
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
