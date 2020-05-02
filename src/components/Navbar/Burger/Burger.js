import React from 'react';

import './Burger.css';

export default function Burger() {
  return (
    <div className="burgerContainer">
      <a href="#" uk-icon="icon: grid; ratio: 2"></a>
      <div uk-dropdown="mode: click;">
        <ul class="uk-nav uk-dropdown-nav">
          <li class="uk-active">
            <a href="#">Active</a>
          </li>
          <li>
            <a href="#">Item</a>
          </li>
          <li class="uk-nav-header">Header</li>
          <li>
            <a href="#">Item</a>
          </li>
          <li>
            <a href="#">Item</a>
          </li>
          <li class="uk-nav-divider"></li>
          <li>
            <a href="#">Item</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
