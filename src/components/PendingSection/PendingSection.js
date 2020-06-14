import React from 'react';
import moment from 'moment';
import './PendingSection.css';

export default function PendingSection(props) {
  console.log('Pending Section', props);
  return (
    <div>
      <h2 className="uk-heading-small">Pending Section</h2>
      <div className="uk-card-default uk-card-body uk-card-small">
        <ul
          className="uk-subnav uk-subnav-pill uk-heading-divider"
          uk-switcher="animation: uk-animation-fade"
        >
          {props.pendingDocs.map((doc, index) => {
            return (
              <li key={index}>
                <a href="#">{doc.name}</a>
              </li>
            );
          })}
        </ul>
        <ul className="uk-switcher uk-margin">
          {props.pendingDocs.map((doc, index) => {
            return (
              <li key={index}>
                <dl className="uk-description-list">
                  <div className="sectHalf">
                    <dt>Approving user</dt>
                    <dd>
                      {doc.approving_userID
                        ? doc.approvingUser_Data.name
                        : 'Still none'}
                    </dd>
                    <dt>Description</dt>
                    <dd>{doc.description ? doc.description : 'Still none'}</dd>
                  </div>
                  <div className="sectHalf">
                    <dt>Created on</dt>
                    <dd>{moment(doc.created_on).format('DD-MM-YYYY HH[h]MM')}</dd>
                    <dt>Your access type</dt>
                    <dd>{doc.type_access === 2 ? 'Read' : 'Edit'}</dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
