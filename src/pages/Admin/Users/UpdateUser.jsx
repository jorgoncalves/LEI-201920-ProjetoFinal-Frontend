import React, { useState, useEffect } from 'react';

import Navbar from '../../../components/Navbar/Navbar';
import Loading from '../../../components/Loading/Loading';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Form/Input/Input';
import UserSelectOne from '../../../components/UserSelect/UserSelectOne';

import { getAllUserInfo } from '../../../util/restCall_users';

import './UsersManagement.css';

export default function UpdateUser(props) {
  const [loading, setLoading] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [formUser, setFormUser] = useState({});
  const [submitValidation, setSubmitValidation] = useState({
    User: false,
  });

  const getAllUserData = async () => {
    let allUsers = await getAllUserInfo();
    allUsers = allUsers.data;
    console.log(allUsers);
    setUsersList(allUsers);
  };

  const functionCaller = async () => {
    await getAllUserData();
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
            Update User
          </h2>
          <div className="profileBox">
            <UserSelectOne
              title="Select a user to update"
              id="user"
              label="User to update"
              selected={formUser}
              select={setFormUser}
              Info={usersList}
              setInfo={setUsersList}
              validationField={'User'}
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
                  pathname: '/usersmanagement',
                  state: { userID: formUser.userID },
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
