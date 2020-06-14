import React from 'react';

import './Input.css';

const input = (props) => (
  <div className={['input', props.newDivClasses].join(' ')}>
    {props.label && (
      <label className="uk-text-emphasis" htmlFor={props.id}>
        {props.label}
      </label>
    )}
    {props.control === 'input' && (
      <input
        className={[
          'uk-input',
          !props.valid ? 'invalid' : 'valid',
          props.touched ? 'touched' : 'untouched',
          props.newInputClasses,
        ].join(' ')}
        type={props.type}
        id={props.id}
        required={props.required}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) =>
          props.onChange(props.id, e.target.value, e.target.files)
        }
        onBlur={props.onBlur}
        disabled={props.disabled}
      />
    )}
    {props.control === 'textarea' && (
      <textarea
        className={[
          'uk-textarea',
          !props.valid ? 'invalid' : 'valid',
          props.touched ? 'touched' : 'untouched',
          props.newInputClasses,
        ].join(' ')}
        id={props.id}
        rows={props.rows}
        required={props.required}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(props.id, e.target.value)}
        onBlur={props.onBlur}
        disabled={props.disabled}
      />
    )}
    {props.control === 'select' && (
      <select
        className="uk-select"
        className={[
          'uk-input',
          !props.valid ? 'invalid' : 'valid',
          props.touched ? 'touched' : 'untouched',
          props.newInputClasses,
        ].join(' ')}
        id={props.id}
        required={props.required}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        disabled={props.disabled}
        defaultValue={props.value}
      >
        {props.options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    )}
    {props.control === 'selectOne' && (
      <select
        className={['uk-select',
          'uk-input',
          !props.valid ? 'invalid' : 'valid',
          props.touched ? 'touched' : 'untouched',
          props.newInputClasses,
        ].join(' ')}
        id={props.id}
        required={props.required}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        disabled={props.disabled}
        defaultValue={props.defaultValue}
        onChange={(e) => {
          props.onChange(props.id, e.target.value);
          console.log('e', e);
        }}
      >
        {props.options.map((option, index) => {
          return (
            <option key={index}>{option.name}</option>
          );
        })}
      </select>
    )}
  </div>
);

export default input;
