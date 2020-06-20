import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import Navbar from '../../../components/Navbar/Navbar';
import Loading from '../../../components/Loading/Loading';
import Button from '../../../components/Button/Button';

import { getDocCommits } from '../../../util/restCall_Docs';

import './Commit.css';

export default function Commits(props) {
  // const [userID] = useState(localStorage.getItem('userID'));
  const { documentID } = useParams('documentID');

  const [loading, setLoading] = useState(true);
  const [commitsList, setCommitsList] = useState([]);

  const functionCaller = async () => {
    const resp = await getDocCommits(documentID);
    console.log(resp);

    setCommitsList(resp.data.commits);
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
            Document history
            {/* <Button
              children="New document Location"
              link="/doclocation"
              newClasses="btnNewLocation"
            /> */}
          </h2>
          <div className="profileBox">
            <div className="DocsBox">
              <div className="docsListContainer listHeaders">
                <div className="docsListChild">New Document name</div>
                <div className="docsListChild">Old Document name</div>
                <div className="docsListChild">Status</div>
                <div className="docsListChild">Date</div>
                <div className=""></div>
              </div>
              <ul
                className="uk-list uk-list-striped  uk-margin-remove-top"
                uk-accordion="true"
              >
                {commitsList.map((commit, index) => {
                  return (
                    <li className="listContainer" key={index}>
                      <a
                        className="docsListChild uk-accordion-title"
                        href="#"
                      ></a>
                      <div className="docsListContainer">
                        <div className="docsListChild">
                          {commit.documentID_newName}
                        </div>
                        <div className="docsListChild">
                          {commit.documentID_oldName !== undefined
                            ? commit.documentID_oldName
                            : 'none'}
                        </div>
                        <div className="docsListChild">{commit.status}</div>
                        <div className="docsListChild">
                          {moment(commit.created_on).format(
                            'DD-MM-YYYY HH[h]mm'
                          )}
                        </div>
                      </div>
                      <div className="uk-accordion-content">
                        <div className="uk-margin">
                          <div className="uk-text-bold">Submitted by: </div>
                          <span className="uk-text-normal">
                            {commit.userName}
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
