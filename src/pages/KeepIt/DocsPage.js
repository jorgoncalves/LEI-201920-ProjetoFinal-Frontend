import React, { useState, useEffect } from 'react';

import './DocsPage.css';

import Navbar from '../../components/Navbar/Navbar';
import DocsShow from '../../components/DocsShow/DocsShow';

export default function useDocsPage(props) {

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

  const fls = props.files=="use" ? state.use_files : state.to_aprove_files

  return (
    <>
      <Navbar onLogout={props.onLogout}/>
      <div className="DocsBox">
        <h2 className="uk-heading-divider uk-margin-medium-bottom">{props.title}</h2>
        <div className="DocsBox">
        <table class="uk-table uk-table-striped">
          <thead>
              <tr>
                  <th>Public</th>
                  <th>File Name</th>
                  <th>External</th>
                  <th>Size</th>
              </tr>
          </thead>
          <tbody>
            {fls.map((file, index) => {
              return (
                  <DocsShow
                    key={index}
                    file={file}
                  />
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}
