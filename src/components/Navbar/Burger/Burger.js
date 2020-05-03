import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Burger.css';

export default function Burger() {
  return (
    <div className="burgerContainer">
      <a href="#" uk-icon="icon: grid; ratio: 2"></a>
      <div uk-dropdown="mode: click;">
        <ul className="uk-nav uk-dropdown-nav">
          <li className="uk-nav-header">Header</li>
          <li className={useLocation().pathname == '/home' ? 'uk-active' : ''}>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <a href="#">Item</a>
          </li>
          <li className="uk-nav-header">Header</li>
          <li>
            <a href="#">Item</a>
          </li>
          <li>
            <a href="#">Item</a>
          </li>
          <li className="uk-nav-divider"></li>
          <li>
            <a href="#">Item</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
