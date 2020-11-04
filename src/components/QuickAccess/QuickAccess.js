import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './QuickAccess.css';

export default function QuickAccess(props) {
  const [quickAccess] = useState(JSON.parse(props.userDisplay).quickAccess);
  
  return (
    <div className="quickAccessContainer">
      <h1 className="uk-heading-small">Quick Access</h1>
      <div className="uk-card uk-card-default uk-card-body uk-card-body">
        <ul className="uk-list uk-list-divider">
          {(quickAccess.length > 0) ? (
            quickAccess.map((li,index) => {
              return (<li key={index}><Link className="uk-text-secondary" to={`/records/${li.documentID}`}>{li.name}</Link></li>)
            })
          ) : (
            <li>There are no pinned Documents</li>
          )}
        </ul>
      </div>
    </div>
  );
}
