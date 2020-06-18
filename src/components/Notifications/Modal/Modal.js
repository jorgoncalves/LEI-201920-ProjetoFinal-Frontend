import React, { useState } from 'react';
import moment from 'moment';
import UIkit from 'uikit';

import './Modal.css';

import Button from '../../Button/Button';

import { updateNotification } from '../../../util/restCall_users';

export default function ModalNotification(props) {
  const [respLoading, setRespLoading] = useState(false);
  const [finalDisabled, setFinalDisabled] = useState(false);
  //   const [state, setState] = useState({
  //     pageNotification: 0,
  //     notifications: props.notifications,
  //   });

  //   const handleNavigation = (operator) => {
  //     setState((prevState) => {
  //       let newPageNotification;
  //       if (operator === 'previous' && prevState.pageNotification > 0) {
  //         newPageNotification = prevState.pageNotification - 1;
  //       }
  //       if (
  //         operator === 'next' &&
  //         prevState.pageNotification + 1 <
  //           Math.round(prevState.notifications.length / 4)
  //       ) {
  //         newPageNotification = prevState.pageNotification + 1;
  //       }
  //       newPageNotification == undefined
  //         ? (newPageNotification = prevState.pageNotification)
  //         : (newPageNotification = newPageNotification);
  //       console.log(newPageNotification);
  //       return {
  //         notifications: props.notifications,
  //         pageNotification: newPageNotification,
  //       };
  //     });
  //   };

  const showModalNotif = () => {
    props.setNotifShow({
      state: false,
      notification: undefined
    });
  };

  const markWasSeenNotification = async () => {
    const notificationID = props.notifShow.notification.notificationID;
    const obj = {
      was_seen: true
    };
    let resp;
    try {
      setRespLoading(true);
      resp = await updateNotification(notificationID, obj);
      console.log(resp);

      // UIkit.modal.dialog(`<p class="uk-modal-body">Updated!</p>`);
      if (resp.status === 201 || resp.status === 200) {
        props.setNotificationList((prevState) => {
          const newNotificationList = props.notificationList.filter(
            (notification) => notification.notificationID !== notificationID
          );
          return newNotificationList;
        });
        setFinalDisabled(true);
        setRespLoading(false);
        showModalNotif();
      }
    } catch (error) {
      console.log(error);
      UIkit.modal.dialog(`<p class="uk-modal-body">${error.message}</p>`);
      setRespLoading(false);
    }
  };

  return (
    <div className="modalNotif">
      <div className="background" onClick={showModalNotif}></div>
      <div className="uk-card uk-card-default uk-modal-body uk-width-1-2@m">
        <div className="uk-card-body">
          <span className="uk-card-title">
            Document {props.notifShow.notification.documentData.name}
          </span>
          <dl className="uk-description-list">
            <dd>
              Is on status: {props.notifShow.notification.documentData.status}
            </dd>
            <dd>{props.notifShow.notification.description}</dd>
            <dd>Notification emmitted by</dd>
            <dd>
              {props.notifShow.notification.submittingUserData.name}
              On
              {moment(props.notifShow.notification.created_on).format(
                'DD-MM-YYYY HH[h]MM'
              )}
            </dd>
          </dl>
        </div>
        <div className="uk-card-footer buttonContainer">
          <Button
            // link="#"
            border=""
            children="Access Document"
            newClasses="uk-margin-small-top uk-margin-small-left modalButton"
            loading={respLoading}
            disabled={finalDisabled}
            onClick={markWasSeenNotification}
          />
          <Button
            // link="#"
            border=""
            children="Dismiss"
            newClasses="uk-margin-small-top uk-margin-small-left modalButton"
            loading={respLoading}
            disabled={finalDisabled}
            onClick={markWasSeenNotification}
          />
        </div>
      </div>
    </div>
  );
}
