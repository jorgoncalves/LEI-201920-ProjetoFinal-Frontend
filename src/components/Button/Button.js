import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';
// Exemplo de como chamar o componente no destino e passar as funcionalidades/aspecto
// <Button design="raised" type="submit" loading={this.props.loading}>
// Login
// </Button>

const button = (props) =>
  !props.link ? (
    <button
      className={[
        'uk-button uk-button-default',
        'button',
        `button--${props.design}`,
        `button--${props.mode}`,
        props.newClasses
      ].join(' ')}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      type={props.type}
    >
      {props.loading ? 'Loading...' : props.children}
    </button>
  ) : (
    <Link
      className={[
        'uk-margin uk-button uk-button-default',
        'button',
        `button--${props.design}`,
        `button--${props.mode}`,
      ].join(' ')}
      to={props.link}
    >
      {props.children}
    </Link>
  );

export default button;
