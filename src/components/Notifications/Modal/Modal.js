import React, { useState } from 'react';

import './Modal.css';

import Button from '../../Button/Button';

export default function ModalNotification(props) {
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
      notification: undefined,
    });
  };

  return (
    <div className="modalNotif">
        <div className="background" onClick={showModalNotif}></div>
        <div className="uk-card uk-card-default uk-modal-body uk-width-1-2@m">
            <div className="uk-card-body">
              {console.log(props.notifShow)}
              <h2 class="uk-modal-title">{props.notifShow.notification.title}{props.notifShow.notification.user ? ` - ${props.notifShow.notification.user}` : ''}</h2>
              <p>{props.notifShow.notification.description}</p>
            </div>
            <div className="uk-card-footer">
            <Button
                link="#"
                border=""
                children="Check"
                newClasses="uk-margin-small-top uk-margin-small-left"
            />
            <Button
                link="#"
                border=""
                children="Deny"
                newClasses="uk-margin-small-top uk-margin-small-left"
            />
            </div>
        </div>
    </div>
  );
}
