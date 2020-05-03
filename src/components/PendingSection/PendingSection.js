import React from 'react';

import './PendingSection.css';

export default function PendingSection() {
  return (
    <div>
      <h1 className="uk-heading-small">Pending Section</h1>
      <div className="uk-card uk-card-default uk-card-large uk-card-body">
        <h3 className="uk-card-title"></h3>
        <div className="pendingContainer">
          <p>Lista de ficheiros pendentes</p>
          <p> Lista de documentos por aprovar</p>
          <p> Atalhos para pastas á escolha do user?</p>
        </div>
      </div>
    </div>
  );
}
