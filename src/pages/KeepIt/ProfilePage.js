import React, { useState, useEffect } from 'react';

import './ProfilePage.css';
import { required, length, email } from '../../util/validators';

import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import Input from '../../components/Form/Input/Input';

const { getUserInfo, getCountriesList } = require('../../util/restCall_users');

export default function LayoutPage(props) {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [isDisabled, setDisabled] = useState(true);
  const [state, setState] = useState();
  const [stateReset, setStateReset] = useState();
  const [countriesList, setCountriesList] = useState();

  useEffect(() => {
    async function userInform() {
      const userID = localStorage.getItem('userID');
      let userInfo = await getUserInfo(userID);

      setState({
        userInfo_form: {
          name: {
            value: userInfo.name,
            valid: true,
            touched: false,
            validators: [required],
          },
          country: {
            value: userInfo.country,
            valid: true,
            touched: false,
            validators: [required],
          },
          country_code: {
            value:
              userInfo.country_code && userInfo.phone_number
                ? `${userInfo.country_code}`
                : 'NA',
            valid: true,
            touched: false,
            validators: [required],
          },
          phone_number: {
            value:
              userInfo.country_code && userInfo.phone_number
                ? `${userInfo.phone_number}`
                : '',
            valid: true,
            touched: false,
            validators: [required],
          },
        },
        formIsValid: true,
      });
      setUserInfo(userInfo);
      setLoading(false);
    }
    userInform();
  }, []);
  useEffect(() => {
    setStateReset(state);
  }, [loading]);

  const editable = () => {
    setDisabled(!isDisabled);
    console.log(stateReset);
    if (!isDisabled) {
      setState(stateReset);
    }
  };

  const inputChangeHandler = (input, value) => {
    console.log(input, value);
    setState((prevState) => {
      let isValid = true;
      // for (const validator of prevState.userInfo_form[input].validators) {
      //   isValid = isValid && validator(value);
      // }
      const updatedForm = {
        ...prevState.userInfo_form,
        [input]: {
          ...prevState.userInfo_form[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      // for (const inputName in updatedForm) {
      //   formIsValid = formIsValid && updatedForm[inputName].valid;
      // }
      return {
        userInfo_form: updatedForm,
        formIsValid: formIsValid,
      };
    });
    console.log(state);
  };
  const inputBlurHandler = (input) => {
    setState((prevState) => {
      return {
        userInfo_form: {
          ...prevState.userInfo_form,
          [input]: {
            ...prevState.userInfo_form[input],
            touched: true,
          },
        },
      };
    });
  };

  return (
    <>
      {loading ? null : (
        <>
          <Navbar onLogout={props.onLogout} />
          <div className="profileBox">
            <h2 className="uk-heading-divider uk-margin-medium-bottom">
              User Profile
            </h2>
            <div className="profileBox">
              <form
                onSubmit={(e) =>
                  props.updateUserInfo(e, {
                    name: state.loginForm.email.value,
                    country: state.loginForm.password.value,
                    country_code: '',
                    phone_number: '',
                  })
                }
              >
                <div className="profileLInline">
                  <h4 className="uk-comment-title uk-margin-small-bottom inlineB">
                    <b>Name: </b>
                  </h4>
                  <Input
                    id="name"
                    type="text"
                    control="input"
                    newClasses="inlineB5 usr_info_put uk-margin-remove-top uk-margin-small-bottom"
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler.bind(this, 'name')}
                    value={state.userInfo_form.name.value}
                    disabled={isDisabled ? true : false}
                  />
                  <br />

                  <h4 className="uk-comment-title uk-margin-small-bottom uk-margin-remove-top inlineB">
                    <b>Email: </b>
                    {userInfo.email}
                  </h4>
                  <br />

                  <h4 className="uk-comment-title uk-margin-small-bottom uk-margin-remove-top">
                    <b>Department: </b>
                    {userInfo.department}
                  </h4>
                  <br />

                  <h4 className="uk-comment-title uk-margin-small-bottom uk-margin-medium-top inlineB">
                    <b>Country: </b>
                  </h4>
                  <Input
                    id="country"
                    type="text"
                    control="input"
                    newClasses="inlineB5 usr_info_put uk-margin-remove-top"
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler.bind(this, 'country')}
                    value={state.userInfo_form.country.value}
                    disabled={isDisabled ? true : false}
                  />
                  <br />

                  <h4 className="uk-comment-title uk-margin-small-bottom uk-margin-remove-top inlineB">
                    <b>Phone Number: </b>
                  </h4>
                  <Input
                    id="country_code"
                    type="number"
                    control="input"
                    placeholder="Country Code"
                    newClasses="inlineB1 usr_info_put uk-margin-remove-top"
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler.bind(this, 'country_code')}
                    value={state.userInfo_form.country_code.value}
                    disabled={isDisabled ? true : false}
                  />
                  <Input
                    id="phone_number"
                    type="number"
                    control="input"
                    placeholder="Phone Number"
                    newClasses="inlineB4 usr_info_put uk-margin-remove-top"
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler.bind(this, 'country_code')}
                    value={state.userInfo_form.phone_number.value}
                    disabled={isDisabled ? true : false}
                  />
                  <br />
                </div>
                <div className="profileContainer inlineB">
                  <i uk-icon="icon: user; ratio: 10"></i>
                </div>
              </form>
            </div>
            <div className="uk-divider-icon uk-margin-medium-top uk-margin-small-bottom"></div>
            <h3 className="uk-margin-medium-bottom uk-margin-small-top">
              User Settings
            </h3>
            <div className="profileBox">
              <Button
                onClick={isDisabled ? editable.bind(this) : null}
                children={isDisabled ? `Edit Profile` : `Save`}
              ></Button>
              {!isDisabled && (
                <Button
                  onClick={editable.bind(this)}
                  children="Cancel"
                ></Button>
              )}
            </div>
          </div>
        </>
      )}{' '}
    </>
  );
}
