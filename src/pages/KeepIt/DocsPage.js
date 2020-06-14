import React, { useState, useEffect } from 'react';

import './DocsPage.css';

import Navbar from '../../components/Navbar/Navbar';
import DocsShow from '../../components/DocsShow/DocsShow';

import { getDocsUser } from '../../util/restCall_Docs';
import Loading from '../../components/Loading/Loading';

export default function DocsPage(props) {
  const [loading, setLoading] = useState(true);

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    async function getInitialData() {
      const resp = await getDocsUser(userID, props.docStatus);
      setDocs(resp.data.documents);
      setLoading(false);
    }
    getInitialData();
  }, []);

  return (
    <>
      <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
      {loading ? (
        <Loading />
      ) : (
        <div className="DocsBox">
          <h2 className="uk-heading-divider uk-margin-medium-bottom">
            {props.title}
          </h2>
          <div className="DocsBox">
            {/* <ul className="uk-list uk-list-striped"> */}
            {/* <li> */}
            <div className="docsListContainer listHeaders">
              <div className="docsListChild">Name</div>
              <div className="docsListChild">Actions</div>
              <div className="docsListChild">Public</div>
              <div className="docsListChild">External</div>
              <div className="docsListChild">Size</div>
              <div className="docsListChild">Access type</div>
              <div className=""></div>
            </div>
            {/* </li> */}
            {/* </ul> */}
            <ul
              className="uk-list uk-list-striped  uk-margin-remove-top"
              uk-accordion="true"
            >
              {docs.map((file, index) => {
                return (
                  <DocsShow
                    key={index}
                    file={file}
                    docStatus={props.docStatus}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
