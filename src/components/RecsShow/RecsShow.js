import React from 'react';
import UIkit from 'uikit';
import FileViewer from 'react-file-viewer';
import { Link } from 'react-router-dom';

import './RecsShow.css';

import { geFile } from '../../util/restAddress';
import Icon from '../Icon/Icon';
// Exemplo de como chamar o componente no destino e passar as funcionalidades/aspecto
// <Button design="raised" type="submit" loading={this.props.loading}>
// Login
// </Button>

export default function RecsShow(props) {

  const showMore = (el) => {
    const temp = el.target.parentElement.children[1].firstElementChild.firstElementChild
    
    if(temp.className=="spanTextLess"){
      temp.className="spanTextMore";
    }else{
      temp.className="spanTextLess";
    }
  }

  return (
    <li className="listContainer">
      <a className="docsListChild uk-accordion-title" href="#" onClick={showMore.bind(this)}></a>
      <div className="grid-container">
        <div className="description">
          {/* {props.docStatus === 'pending' ? (
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
          )} */}
          <span className="spanTextLess">{props.record.description}</span>
        </div>
        <div className="attachments">
          {/* {props.file.isModelFile && (
            <Icon icon="download" link={`${geFile}?path=${props.file.path}`} />
          )}
          {props.file.has_records && (
            <Icon icon="album" link={`/records/${props.file.documentID}`} />
          )} */}
          {props.record.attachments.length}
        </div>
      </div>
      <div className="uk-accordion-content">
        {/* <div className="uk-text-bold">Description:</div>
        {props.file.description}
        <div>
          {// <object data="http://localhost:8080/filexplorer/getFile?path=FileStorage/Reclamações/1/IMG1.png" />}
          <FileViewer
            filePath={`${geFile}?path=FileStorage/Reclamações/3/Docx1.docx`}
            fileType="docx"
          />
        </div> */}
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxx
      </div>
    </li>
  );
}
