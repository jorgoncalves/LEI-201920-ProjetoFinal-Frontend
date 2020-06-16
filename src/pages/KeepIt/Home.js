import React, { useState, useEffect } from 'react';

import Loading from '../../components/Loading/Loading';
import Navbar from '../../components/Navbar/Navbar';
import QuickAccess from '../../components/QuickAccess/QuickAccess';
import Notification from '../../components/Notifications/Notification';
import PendingSection from '../../components/PendingSection/PendingSection';
import ModalNotif from '../../components/Notifications/Modal/Modal';

import './Home.css';

import { getDocsUser } from '../../util/restCall_Docs';
import { getUserNotifications } from '../../util/restCall_users';

export default function Home(props) {
  const [userID] = useState(localStorage.getItem('userID'));
  const [loading, setLoading] = useState(true);
  const [pendingDocs, setPendingDocs] = useState([]);
  const [notificationList, setNotificationList] = useState([]);

  const getPendingDocs = async () => {
    const resp = await getDocsUser(userID, 'pending');
    setPendingDocs(resp.data.documents);
  };

  const getUserNotificationsList = async () => {
    const resp = await getUserNotifications(userID, 'pending');
    setNotificationList(resp.data.respFind);
  };

  const functionCaller = async () => {
    await getPendingDocs();
    await getUserNotificationsList();
    setLoading(false);
  };

  useEffect(() => {
    functionCaller();
  }, []);
  const [state] = useState({
    notifications: [
      {
        title: 'Notif 1',
        user: 'Utilizador 1',
        description: 'Necessita de Aprovar o Documento DF1'
      },
      {
        title: 'Notif 2',
        user: '',
        description: 'Tem um documento ???por elaborar???'
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)'
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)'
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)'
      },
      {
        title: 'Notif 1',
        user: 'Utilizador 1',
        description: 'Necessita de Aprovar o Documento DF1'
      },
      {
        title: 'Notif 2',
        user: '',
        description: 'Tem um documento ???por elaborar???'
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)'
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)'
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)'
      },
      {
        title: 'Notif 1',
        user: 'Utilizador 1',
        description: 'Necessita de Aprovar o Documento DF1'
      },
      {
        title: 'Notif 2',
        user: '',
        description: 'Tem um documento ???por elaborar???'
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)'
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)'
      }
    ]
  });

  const [notifShow, setNotifShow] = useState({
    state: false,
    notification: undefined
  });

  return (
    <>
      <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="uk-margin uk-flex uk-flex-around mainContainer">
            <div className="homeLeftContainer">
              <QuickAccess />
            </div>
            <div className="homeRightContainer">
              <Notification
                notifications={notificationList}
                setNotifShow={setNotifShow}
              />
              <PendingSection pendingDocs={pendingDocs} />
            </div>
          </div>
          {notifShow.state ? (
            <ModalNotif setNotifShow={setNotifShow} notifShow={notifShow} />
          ) : null}
        </>
      )}
    </>
  );
}
