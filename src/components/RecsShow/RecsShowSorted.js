import React, { useState } from 'react';
// import UIkit from 'uikit';
// import FileViewer from 'react-file-viewer';
// import { Link } from 'react-router-dom';

import './RecsShow.css';

// import { geFile } from '../../util/restAddress';
import RecsShow from './RecsShow';
// import Loading from "../Loading/Loading";

export default function RecsShowSorted(props) {
  // const [loading, setLoading] = useState(true);
  const [Recs] = useState(Object.entries(props.record)[0][0]);

  // const loadRecs = async () => {
  //   await Object.entries(props.record).forEach(([index, rec]) => {
  //     return (<RecsShow key={index} record={rec} />);
  //   })
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   setRecs(loadRecs());
  //   return () => {
  //     setLoading(true);
  //   }
  // }, [])
  return (
    <>
      <li className="listContainer">
        <a className="docsListChild uk-accordion-title" href="#"></a>
        <div className="grid-container">
          <div className="description">
            <span className="spanTextLess">{Recs}</span>
          </div>
          <div className="attachments">{props.record[Recs].length}</div>
        </div>
        <div className="uk-accordion-content">
          <div className="detailBox">
            <div className="grid-container listHeaders">
              <div className="description">Description</div>
              <div className="attachments">Attachments</div>
              <div className=""></div>
            </div>
            <ul
              className="uk-list uk-list-striped  uk-margin-remove-top"
              uk-accordion="true"
            >
              {props.record[Recs].map((rec, index) => {
                return (
                  <RecsShow key={index} record={rec} />

                  //   <li className="listContainer">
                  //   <a className="docsListChild uk-accordion-title" href="#"></a>
                  //   <div className="grid-container">
                  //     <div className="description">
                  //       <span className="spanTextLess">{rec.description}</span>
                  //     </div>
                  //     <div className="attachments">
                  //       {rec.attachments.length}
                  //     </div>
                  //   </div>
                  //   <div className="uk-accordion-content">
                  //     XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxx
                  //   </div>
                  // </li>
                );
              })}
            </ul>
          </div>
        </div>
      </li>
    </>
  );
}
