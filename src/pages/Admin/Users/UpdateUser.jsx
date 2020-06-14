import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import Loading from '../../../components/Loading/Loading';

import './UsersManagement.css';

export default function UsersManagement(props) {
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
            Update User
          </h2>
          <div className="profileBox"></div>
        </div>
      )}
    </>
  );
}
