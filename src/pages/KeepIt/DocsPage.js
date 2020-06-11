import React, { useState, useEffect } from 'react';

import './DocsPage.css';

import Navbar from '../../components/Navbar/Navbar';
import DocsShow from '../../components/DocsShow/DocsShow';

import { getDocsUser } from '../../util/restCall_Docs';
import Loading from '../../components/Loading/Loading';

export default function useDocsPage(props) {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    use_files: [
      {
        file_name: 'Tomas.jpg',
        is_public: true,
        is_external: true,
        size: '1234B',
      },
      {
        file_name: 'Jorge.txt',
        is_public: false,
        is_external: true,
        size: '1124B',
      },
      {
        file_name: 'Tiago.docx',
        is_public: false,
        is_external: false,
        size: '1324B',
      },
      {
        file_name: 'Tomas.jpg',
        is_public: true,
        is_external: false,
        size: '12234B',
      },
    ],
    to_aprove_files: [
      {
        file_name: 'Tomasaaa.jpg',
        is_public: true,
        is_external: true,
        size: '1234B',
      },
      {
        file_name: 'Jorgeaaa.txt',
        is_public: false,
        is_external: true,
        size: '1124B',
      },
      {
        file_name: 'Tiagaaao.docx',
        is_public: false,
        is_external: false,
        size: '1324B',
      },
      {
        file_name: 'Tomaaaas.jpg',
        is_public: true,
        is_external: false,
        size: '12234B',
      },
    ],
  });
  const [docs, setDocs] = useState([]);
  const fls = props.files === 'use' ? state.use_files : state.to_aprove_files;

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
