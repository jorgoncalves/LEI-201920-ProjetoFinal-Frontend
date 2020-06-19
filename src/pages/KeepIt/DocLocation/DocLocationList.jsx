import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Navbar from '../../../components/Navbar/Navbar';
import Loading from '../../../components/Loading/Loading';
import Button from '../../../components/Button/Button';

import { getCurrentDocsLocations } from '../../../util/restCall_DocLocation';

import './DocLocationList.css'

export default function DocLocationList(props) {
  // const [userID] = useState(localStorage.getItem('userID'));
  const [loading, setLoading] = useState(true);
  const [docsLocationsList, setDocsLocationsList] = useState([]);

  const functionCaller = async () => {
    const resp = await getCurrentDocsLocations(null, null, null);
    setDocsLocationsList(resp.data.docsLocations);
    setLoading(false);
  };

  useEffect(() => {
    functionCaller();
  }, []);

  return (
    <>
      <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
      {loading ? (
        <Loading />
      ) : (
        <div className="profileBox">
          <h2 className="uk-heading-divider uk-margin-medium-bottom">
            Document Location List{' '}
            <Button
              children="New document Location"
              link="/doclocation"
              newClasses="btnNewLocation"
            />
          </h2>
          <div className="profileBox">
            <div className="DocsBox">
              <div className="docsListContainer listHeaders">
                <div className="docsListChild">Document name</div>
                {/* <div className="docsListChild">Location</div> */}
                <div className="docsListChild">Submitted by</div>
                <div className="docsListChild">Date</div>
                <div className=""></div>
              </div>
              <ul
                className="uk-list uk-list-striped  uk-margin-remove-top"
                uk-accordion="true"
              >
                {docsLocationsList.map((location, index) => {
                  return (
                    <li className="listContainer" key={index}>
                      <a
                        className="docsListChild uk-accordion-title"
                        href="#"
                      ></a>
                      <div className="docsListContainer">
                        <div className="docsListChild">
                          {location.documentID_newName}
                        </div>
                        <div className="docsListChild">{location.userName}</div>
                        <div className="docsListChild">
                          {moment(location.created_on).format(
                            'DD-MM-YYYY HH[h]MM'
                          )}
                        </div>
                      </div>
                      <div className="uk-accordion-content">
                        <div className="uk-margin">
                          <div className="uk-text-bold">Location: </div>
                          <span className="uk-text-normal">
                            {location.local}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
