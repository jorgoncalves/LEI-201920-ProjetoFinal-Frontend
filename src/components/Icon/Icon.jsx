import React from 'react';
import { Link } from 'react-router-dom';

import './Icon.css';

export default function Icon(props) {
  return (
    <>
      {!props.link ? (
        <span
          uk-icon={`icon: ${props.icon}`}
          className={[props.class, 'iconFormat'].join(' ')}
        ></span>
      ) : (
        <>
          {props.icon === 'download' ? (
            <a
              href={`${props.link}`}
              uk-icon={`icon: ${props.icon}`}
              className={[props.class, 'iconFormat'].join(' ')}
              download
              uk-tooltip={props.tooltip}
            ></a>
          ) : (
            <Link
              uk-tooltip={props.tooltip}
              to={`${props.link}`}
              uk-icon={`icon: ${props.icon}`}
              className={[props.class, 'iconFormat'].join(' ')}
            ></Link>
          )}
        </>
      )}
    </>
  );
}
