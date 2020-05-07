import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import QuickAccess from '../../components/QuickAccess/QuickAccess';
import Notification from '../../components/Notifications/Notification';
import PendingSection from '../../components/PendingSection/PendingSection';

import './Home.css';

function Home() {
  const [state, setState] = useState({
    notifications: [
      {
        title: 'Notif 1',
        user: 'Utilizador 1',
        description: 'Necessita de Aprovar o Documento DF1',
      },
      {
        title: 'Notif 2',
        user: '',
        description: 'Tem um documento ???por elaborar???',
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)',
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)',
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)',
      },{
        title: 'Notif 1',
        user: 'Utilizador 1',
        description: 'Necessita de Aprovar o Documento DF1',
      },
      {
        title: 'Notif 2',
        user: '',
        description: 'Tem um documento ???por elaborar???',
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)',
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)',
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)',
      },{
        title: 'Notif 1',
        user: 'Utilizador 1',
        description: 'Necessita de Aprovar o Documento DF1',
      },
      {
        title: 'Notif 2',
        user: '',
        description: 'Tem um documento ???por elaborar???',
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)',
      },
      {
        title: 'Notif 3',
        user: 'Utilizador 4',
        description: 'Pedido de revisão concluido (Aprovado)',
      },
    ],
  });
  return (
    <>
      <Navbar />
      <div className="uk-margin uk-flex uk-flex-around mainContainer">
        <div className="homeLeftContainer">
          <QuickAccess />
        </div>
        <div className="homeRightContainer">
          <Notification notifications={state.notifications} />
          <PendingSection />
        </div>
      </div>
    </>
  );
}

export default Home;
