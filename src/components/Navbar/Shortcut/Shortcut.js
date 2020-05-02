import React from 'react';

import './Shortcut.css';

export default function Shortcut(props) {
  return (
    <div className="shorcutContainer">
      <button class="uk-button uk-button-default">{props.shortcut.name}</button>
    </div>
  );
}
