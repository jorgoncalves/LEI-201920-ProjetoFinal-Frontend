import React from 'react';

import Navbar from '../../components/Navbar/Navbar';

export default function LayoutPage(props) {
  return (
    <>
      <Navbar onLogout={props.onLogout}/>
    </>
  );
}
