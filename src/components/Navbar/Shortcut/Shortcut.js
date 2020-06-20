import React from 'react';
import { Link } from 'react-router-dom';

import './Shortcut.css';

// import Button from '../../Button/Button';

export default function Shortcut(props) {
  return (
    <div className="shorcutContainer">
      <Link
        className={['uk-button uk-button-default', 'button'].join(' ')}
        to={props.shortcut.link}
      >
        {props.shortcut.name}
      </Link>
    </div>
  );
}
