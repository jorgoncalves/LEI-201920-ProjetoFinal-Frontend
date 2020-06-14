import React from 'react';

import './UserCard.css';
// Exemplo de como chamar o componente no destino e passar as funcionalidades/aspecto
// <Button design="raised" type="submit" loading={this.props.loading}>
// Login
// </Button>

export default function userCard(props) {
  return (
    <div>
      <div className="uk-card uk-card-default uk-card-body">
        <h3 className="uk-card-title uk-margin-small-bottom">
          {props.userInfo.userInfo.name}{' '}
          {props.departChief === props.userInfo.userInfo.userID ? '(Chief)' : ''}{' '}
          {props.currentUser === props.userInfo.userInfo.userID ? '(YOU)' : ''}
        </h3>
        <a href={`mailto:${props.userInfo.userAuth.email}`}>
          {props.userInfo.userAuth.email}
        </a>
        <br />
        {props.userInfo.userInfo.country_code &&
        props.userInfo.userInfo.phone_number ? (
          <a
            href={`tel:+${props.userInfo.userInfo.country_code}${props.userInfo.userInfo.phone_number}`}
          >
            +{props.userInfo.userInfo.country_code}
            {props.userInfo.userInfo.phone_number}
          </a>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
