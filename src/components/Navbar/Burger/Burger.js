import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Burger.css';

export default function Burger() {
  return (
    <div className="burgerContainer">
      <a href="#" uk-icon="icon: grid; ratio: 2"></a>
      <div uk-dropdown="mode: click;">
        <ul className="uk-nav uk-dropdown-nav">
          <li className="uk-nav-header">Gestão</li>
          <li className={useLocation().pathname === '/' ? 'actv' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li
            className={useLocation().pathname === '/department' ? 'actv' : ''}
          >
            <Link to="/department">Departamento</Link>
          </li>
          <li className="uk-nav-header">Documentação</li>
          <li className={useLocation().pathname === '/useDocs' ? 'actv' : ''}>
            <Link to="/useDocs">Documentos para uso</Link>
          </li>
          <li className={useLocation().pathname === '/aprovDocs' ? 'actv' : ''}>
            <Link to="/aprovDocs">Documentos por aprovar</Link>
          </li>
          <li className={useLocation().pathname === '/penDocs' ? 'actv' : ''}>
            <Link to="/penDocs">Documentos pendentes</Link>
          </li>
          <li
            className={
              useLocation().pathname === '/notApprovDocs' ? 'actv' : ''
            }
          >
            <Link to="/notApprovDocs">Documentos reprovados</Link>
          </li>
          <li
            className={useLocation().pathname === '/obsoleteDocs' ? 'actv' : ''}
          >
            <Link to="/obsoleteDocs">Documentos obsoletos</Link>
          </li>
          <li
            className={
              useLocation().pathname === '/doclocationlist' ? 'actv' : ''
            }
          >
            <Link to="/doclocationlist">Documents Location List</Link>
          </li>
          <li className="uk-nav-divider"></li>
          <li className={useLocation().pathname === '/newDoc' ? 'actv' : ''}>
            <Link to="/newDoc">Submeter Novo Documento</Link>
          </li>
          <li
            className={useLocation().pathname === '/submitrecord' ? 'actv' : ''}
          >
            <Link to="/submitrecord">Submit record</Link>
          </li>
          <li className="uk-nav-divider"></li>
          <li className={useLocation().pathname === '/about' ? 'actv' : ''}>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
