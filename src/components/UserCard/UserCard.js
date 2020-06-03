import React from 'react';
import { Link } from 'react-router-dom';

import './UserCard.css';
// Exemplo de como chamar o componente no destino e passar as funcionalidades/aspecto
// <Button design="raised" type="submit" loading={this.props.loading}>
// Login
// </Button>


export default function userCard(props) {
  return (
    <div>
      <div className="uk-card uk-card-default uk-card-body">
        <h3 class="uk-card-title">{props.userInfo.name}</h3>
        <a href={`mailto:${props.userInfo.email}`}>{props.userInfo.email}</a>
        {props.userInfo.country_code && props.userInfo.phone_number ? <a href={`tel:+${props.userInfo.country_code}${props.userInfo.phone_number}`}>+{props.userInfo.country_code}{props.userInfo.phone_number}</a> : ''}
      </div>
    </div>
  );
}
