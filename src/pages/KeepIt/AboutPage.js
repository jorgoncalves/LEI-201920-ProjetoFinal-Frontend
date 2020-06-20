import React from 'react';

import './AboutPage.css';

import Navbar from '../../components/Navbar/Navbar';

export default function About(props) {
  return (
    <>
      <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
      <div className="AboutBox">
          <h2 className="uk-heading-divider uk-margin-medium-bottom">
            About KeepIt
            <span className="SoftwareDtls uk-margin-small-left">
              Document Management Software
            </span>
          </h2>
          <div className="AboutBox">
            <span className="uk-text-lead uk-margin-small-bottom">© 2020 João Tomás Barreira & Jorge Gonçalves</span>
            <br/>
            <span className="uk-text-meta">All rights Reserved</span>
            <br/>
            <br/>
            <span className="uk-text-meta contactInfo">For more information contact: </span>
            <span className="uk-text-meta uk-text-bold uk-margin-small-left contactInfo">
              <a href="mailto:tomas.barreira14@outlook.pt">tomas.barreira14@outlook.pt</a>
              <br/>
              <a href="mailto:jorge.oliveira.goncalves@outlook.pt">jorge.oliveira.goncalves@outlook.pt</a></span>
          </div>
        </div>
    </>
  );
}
