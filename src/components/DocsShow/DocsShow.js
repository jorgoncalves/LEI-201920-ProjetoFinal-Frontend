import React from 'react';
import UIkit from 'uikit';
import FileViewer from 'react-file-viewer';
import { Link } from 'react-router-dom';

import Button from '../Button/Button';

import Icon from '../Icon/Icon';
import './DocsShow.css';

import { geFile } from '../../util/restAddress';

import { updateDocument } from '../../util/restCall_Docs';

export default function DocsShow(props) {
  const formatBytes = (a, b = 2) => {
    if (0 === a) return '0 Bytes';
    const c = 0 > b ? 0 : b,
      d = Math.floor(Math.log(a) / Math.log(1024));
    return (
      parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
      ' ' +
      ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
    );
  };

  const updateDocState = async (status) => {
    const obj = {
      userID: props.userID,
      status
    };
    try {
      const resp = await updateDocument(props.file.documentID, obj);
      UIkit.modal.dialog(`<p class="uk-modal-body">${resp.message}!</p>`);
      const docs = props.docs.filter(
        (doc) => doc.documentID !== props.file.documentID
      );
      props.setDocs(docs);
    } catch (error) {
      console.log(error);
      UIkit.modal.dialog(`<p class="uk-modal-body">${error.message}</p>`);
    }
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
                  file: props.file
                }
              }}
            >
              {props.file.name}
            </Link>
          ) : (
            props.file.name
          )}
        </div>
        <div className="docsListChild">
          {(props.userDisplay.quickAccess.findIndex(x=> x.documentID == props.file.documentID)>-1) ? (
            <Icon icon="bookmark" tooltip="UnPin" link="#" onClick={props.setQuickAccess.bind(this, props.file, false)} class="red"/>
          ) : (
            <Icon icon="bookmark" tooltip="Pin" link="#" onClick={props.setQuickAccess.bind(this, props.file, true)}/>
          )}
          {props.file.isModelFile && (
            <Icon icon="download" tooltip="Download File" link={`${geFile}?path=${props.file.path}`} />
          )}
          {(props.docStatus === 'approved' ||
            props.docStatus === 'obsolete') && (
              <>
                {props.file.has_records && (
                  <Icon
                    icon="album"
                    link={`/records/${props.file.documentID}`}
                    tooltip="Records"
                  />
                )}{' '}
              </>
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
        <div className="docsListChild">{formatBytes(props.file.size)}</div>
        <div className="docsListChild">
          {props.file.type_access === 1 ? 'Full access' : 'Read only'}
        </div>
      </div>
      <div className="uk-accordion-content">
        <div className="uk-margin">
          <div className="uk-text-bold">Description:</div>
          <span className="uk-text-normal">{props.file.description}</span>
        </div>
        <div key={props.file.ID} className="uk-margin">
          <FileViewer
            filePath={`${geFile}?path=${props.file.path}`}
            fileType={props.file.path.split('.')[1]}
            key={props.file.documentID}
            id={props.file.documentID}
          />
        </div>
        {props.docStatus === 'forapproval' && (
          <div className="uk-margin">
            <Button
              children="Approve"
              newClasses="uk-margin-right"
              onClick={updateDocState.bind(this, 'approved')}
              loading=""
            />
            <Button
              children="Repprove"
              newClasses=""
              onClick={updateDocState.bind(this, 'repproved')}
              loading=""
            />
          </div>
        )}
      </div>
    </li>
  );
}
