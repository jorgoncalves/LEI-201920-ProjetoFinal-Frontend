import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button/Button';
import Navbar from '../../components/Navbar/Navbar';
import Loading from '../../components/Loading/Loading';

import './AdminPanel.css';

export default function AdminPanel(props) {
  const [loading, setLoading] = useState(true);

  const functionCaller = async () => {
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
            Admin panel
          </h2>
          <div className="profileBox">
            <h3 className="uk-link-heading">Users Managements</h3>
            {/* <div className="profileBox"> */}
            <Button
              link="/createuser"
              newClasses="uk-margin-small-right"
              children="Create User"
            />

            <Button
              link="/updateuser"
              newClasses="uk-margin-small-left"
              children="Update User"
            />
            {/* </div> */}
            <h3 className="uk-link-heading">Departments Managements</h3>
            <Button
              link="/departmentsmanagement"
              newClasses="uk-margin-small-right"
              children="Create Department"
            />

            <Button
              link="/updatedepartment"
              newClasses="uk-margin-small-left"
              children="Update Department"
            />
          </div>
        </div>
      )}
    </>
  );
}
