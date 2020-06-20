import React, { useState, useEffect } from 'react';
import moment from 'moment';

// import Modal from '../../components/Notifications/Modal/Modal'

import './Notification.css';

export default function Notification(props) {
  const [state, setState] = useState({
    pageNotification: 0,
    notifications: props.notifications
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
          Math.ceil(prevState.notifications.length / 4)
      ) {
        newPageNotification = prevState.pageNotification + 1;
      }
      if (newPageNotification === undefined)
        newPageNotification = prevState.pageNotification;

      console.log(newPageNotification);
      return {
        notifications: props.notifications,
        pageNotification: newPageNotification
      };
    });
  };

  const showModalNotif = (notifData) => {
    props.setNotifShow({
      state: true,
      notification: notifData
    });
  };

  useEffect(() => {
    setState((prevState) => {
      let page;
      if (
        prevState.pageNotification !== 0 &&
        prevState.pageNotification + 1 >
          Math.ceil(prevState.notifications.length / 4)
      )
        page = prevState.pageNotification - 1;
      else page = prevState.pageNotification;
      return {
        pageNotification: page,
        notifications: props.notifications
      };
    });
  }, [props.notifications]);

  return (
    <>
      <div className="notificationContainer">
        <div className="uk-flex uk-flex-between">
          <h1 className="uk-heading-small">Notifications</h1>
          <ul
            className="uk-pagination uk-flex-right customPagination"
            uk-margin="true"
            uk-switcher="animation: uk-animation-fade"
          >
            <li>
              <a href="#">
                <span
                  uk-pagination-previous="true"
                  onClick={handleNavigation.bind(this, 'previous')}
                  uk-switcher="animation: uk-animation-fade"
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
                  uk-switcher="animation: uk-animation-fade"
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
                  className="uk-card uk-card-default uk-card-small uk-card-body notification-card"
                  onClick={showModalNotif.bind(this, notification)}
                >
                  <span className="uk-card-title">
                    Document {notification.documentData.name}
                  </span>
                  <dl className="uk-description-list">
                    <dd>Is on status: {notification.documentData.status}</dd>
                    <dd>{notification.description}</dd>
                    <dd>
                      Notification emmitted by{' '}
                      {notification.submittingUserData.name} On
                      {moment(notification.created_on).format(
                        'DD-MM-YYYY HH[h]mm'
                      )}
                    </dd>
                  </dl>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
