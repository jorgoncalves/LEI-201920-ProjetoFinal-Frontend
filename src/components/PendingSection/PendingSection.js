import React from 'react';

import './PendingSection.css';

export default function PendingSection() {
  return (
    <div>
      <h1 className="uk-heading-small">Pending Section</h1>
      <div className="uk-card-default uk-card-body uk-card-small">
        <ul
          class="uk-subnav uk-subnav-pill"
          uk-switcher="animation: uk-animation-fade"
        >
          <li>
            <a href="#">Item</a>
          </li>
          <li>
            <a href="#">Item</a>
          </li>
          <li>
            <a href="#">Item</a>
          </li>
        </ul>
        <ul className="uk-switcher uk-margin">
          <li>Hello!</li>
          <li>Hello again!</li>
          <li>Bazinga!</li>
        </ul>
      </div>
    </div>
  );
}
