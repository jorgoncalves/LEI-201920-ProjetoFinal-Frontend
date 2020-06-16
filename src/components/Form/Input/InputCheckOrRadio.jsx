import React from 'react';

export default function InputCheckOrRadio(props) {
  return (
    <>
      <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
        <label>
          <input
            className={`uk-${props.type}`}
            type={props.type}
            checked={props.checked}
            onChange={(e) => props.onChange(props.id, e.target.checked)}
          />
          {props.label}
        </label>
      </div>
    </>
  );
}
