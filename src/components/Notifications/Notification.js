import React, { useState } from 'react';

import './Notification.css';

export default function Notification(props) {
  const [state, setState] = useState({
    pageNotification: 0,
    notifications: props.notifications,
  });

  const handleNavigation = (operator) => {
    setState((prevState) => {
      let newPageNotification;
      if (operator === 'previous' && prevState.pageNotification > 0) {
        newPageNotification = prevState.pageNotification - 1;
      }
      if (
        operator === 'next' &&
        prevState.pageNotification + 1 <
          Math.round(prevState.notifications.length / 4)
      ) {
        newPageNotification = prevState.pageNotification + 1;
      }
      if (newPageNotification === undefined)
        newPageNotification = prevState.pageNotification;

      console.log(newPageNotification);
      return {
        notifications: props.notifications,
        pageNotification: newPageNotification,
      };
    });
  };

  const showModalNotif = (notifData) => {
    props.setNotifShow({
      state: true,
      notification: notifData,
    });
  };

  return (
    <>
      <div>
        <div className="uk-flex uk-flex-between">
          <h1 className="uk-heading-small">Notifications</h1>
          <ul
            className="uk-pagination uk-flex-right uk-margin-medium-top"
            uk-margin="true"
          >
            <li>
              <a href="#">
                <span
                  uk-pagination-previous="true"
                  onClick={handleNavigation.bind(this, 'previous')}
                ></span>
              </a>
            </li>
            <li>
              <span className="uk-disabled">{state.pageNotification + 1}</span>
            </li>
            <li className="uk-disabled">
              <span>/</span>
            </li>
            <li>
              <span className="uk-disabled">
                {Math.ceil(state.notifications.length / 4)}
              </span>
            </li>
            <li>
              <a>
                <span
                  uk-pagination-next="true"
                  onClick={handleNavigation.bind(this, 'next')}
                ></span>
              </a>
            </li>
          </ul>
        </div>
        <div className="uk-flex uk-flex-wrap uk-flex-between notifications">
          {/* Colocar condição para paginação */}
          {/* Ultimo card caso exista seguinte é seta */}

          {props.notifications
            .slice(state.pageNotification * 4, 4 + state.pageNotification * 4)
            .map((notification, index) => {
              return (
                <div
                  key={index}
                  className="uk-card uk-card-default uk-card-body notification-card"
                  onClick={showModalNotif.bind(this, notification)}
                >
                  <h3 className="uk-card-title">
                    {notification.title}
                    {notification.user ? ` - ${notification.user}` : ''}
                  </h3>
                  <p>{notification.description}</p>
                </div>
              );
            })}
        </div>
      </div>{' '}
    </>
  );
}
