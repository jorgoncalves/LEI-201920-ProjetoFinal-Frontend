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
          <li className={useLocation().pathname == '/' ? 'actv' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={useLocation().pathname == '/department' ? 'actv' : ''}>
            <a href="/department">Departamento</a>
          </li>

          <li className="uk-nav-header">Documentação</li>
          <li className={useLocation().pathname == '/useDocs' ? 'actv' : ''}>
            <a href="/useDocs">Documentos para uso</a>
          </li>
          <li className={useLocation().pathname == '/aprovDocs' ? 'actv' : ''}>
            <a href="/aprovDocs">Documentos por aprovar</a>
          </li>
          <li className={useLocation().pathname == '/penDocs' ? 'actv' : ''}>
            <a href="/penDocs">Documentos pendentes</a>
          </li>
          <li className={useLocation().pathname == '/notAprovDocs' ? 'actv' : ''}>
            <a href="/notAprovDocs">Documentos reprovados</a>
          </li>
          <li className="uk-nav-divider"></li>
          <li className={useLocation().pathname == '/newDoc' ? 'actv' : ''}>
            <a href="/newDoc">Submeter Novo Documento</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
