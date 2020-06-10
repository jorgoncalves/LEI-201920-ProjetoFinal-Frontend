import React from 'react';

import './LayoutPage.css';

import Navbar from '../../components/Navbar/Navbar';

export default function LayoutPage(props) {
  return (
    <>
      <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
    </>
  );
}
