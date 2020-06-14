import React from 'react';
// import UIkit from 'uikit';
import FileViewer from 'react-file-viewer';
import { Link } from 'react-router-dom';

import './DocsShow.css';

import { geFile } from '../../util/restAddress';
import Icon from '../Icon/Icon';

export default function DocsShow(props) {
  const onError = (e) => {
    console.log(e, 'error in file-viewer');
  };
  return (
    <li className="listContainer">
      <a className="docsListChild uk-accordion-title" href="#"></a>
      <div className="docsListContainer">
        <div className="docsListChild docNameContainer">
          {props.docStatus === 'pending' ? (
            <Link
              to={{
                pathname: '/newDoc',
                state: {
                  from: '/penDocs',
                  file: props.file,
                },
              }}
            >
              {props.file.name}
            </Link>
          ) : (
            props.file.name
          )}
        </div>
        <div className="docsListChild">
          {props.file.isModelFile && (
            <Icon icon="download" link={`${geFile}?path=${props.file.path}`} />
          )}
          {props.file.has_records && (
            <Icon icon="album" link={`/records/${props.file.documentID}`} />
          )}
        </div>
        <div className="docsListChild">
          <Icon
            type="span"
            icon={props.file.is_public ? 'check' : 'close'}
            class="uk-margin-left"
          />
        </div>
        <div className="docsListChild">
          <Icon
            type="span"
            icon={props.file.is_external ? 'check' : 'close'}
            class="uk-margin-left"
          />
        </div>
        <div className="docsListChild">{props.file.size}</div>
        <div className="docsListChild">
          {props.file.type_access === 1 ? 'Full access' : 'Read only'}
        </div>
      </div>
      <div className="uk-accordion-content">
        <div className="uk-text-bold">Description:</div>
        {props.file.description}
        <div key={props.file.ID}>
          <FileViewer
            filePath={`${geFile}?path=${props.file.path}`}
            fileType={props.file.path.split('.')[1]}
            key={props.file.documentID}
            id={props.file.documentID}
            onError={onError}
          />
        </div>
      </div>
    </li>
  );
}
