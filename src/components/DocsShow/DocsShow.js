import React from 'react';
import { Link } from 'react-router-dom';

import './DocsShow.css';
// Exemplo de como chamar o componente no destino e passar as funcionalidades/aspecto
// <Button design="raised" type="submit" loading={this.props.loading}>
// Login
// </Button>


export default function DocsShow(props) {
  return (
    <>
      <tr>
          <td>{props.file.is_public ? 'SIM' : 'NAO'}</td>
          <td>{props.file.file_name}</td>
          <td>{props.file.is_external ? 'SIM' : 'NAO'}</td>
          <td>{props.file.size}</td>
      </tr>
    </>
  );
}
