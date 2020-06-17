import React from 'react';

export default function InputCheckOrRadio(props) {
  return (
    <>
      <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
        <label>
          <input
            className={`uk-${props.type}`}
            type={props.type}
            id={props.id}
            checked={props.checked}
            disabled={props.disabled}
            onChange={(e) => props.onChange(props.id, e.target.value)}
          />
          {props.label}
        </label>
      </div>
    </>
  );
}
