import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Login from './pages/Auth/Login';
import Home from './pages/KeepIt/Home';
import ProfilePage from './pages/KeepIt/ProfilePage';

const App = () => {
  // const state= {
  //   token: null
  // }
  let routes = (
    <>
      <Route path="/" exact render={(props) => <Login {...props} />} />
      {/* /home definido só para testes */}
      <Route path="/home" exact render={(props) => <Home {...props} />} />
      <Route
        path="/profile"
        exact
        render={(props) => <ProfilePage {...props} />}
      />
    </>
  );
  // Quando estiver feito à autenticação, colocar o if a apontar para variavel
  if (false) {
    // alterar o componente a que está a fazer render
    routes = <Route path="/" exact render={(props) => <Login {...props} />} />;
  }
  return (
    <Switch>
      {routes}
      <Redirect to="/" />
    </Switch>
  );
};

export default withRouter(App);
