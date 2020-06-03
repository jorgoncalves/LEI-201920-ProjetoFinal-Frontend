import React from 'react';

import './useDocsPage.css';

import Navbar from '../../components/Navbar/Navbar';

export default function useDocsPage(props) {
  return (
    <>
      <Navbar onLogout={props.onLogout}/>
      <div className="DocsBox">
        <h2 className="uk-heading-divider uk-margin-medium-bottom">Documents for Use</h2>
        <div className="DocsBox">
          
        </div>
      </div>
    </>
  );
}
