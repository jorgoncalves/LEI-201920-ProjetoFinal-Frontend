import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useHistory,
} from 'react-router-dom';

import UIkit from 'uikit';
import jwtDecode from 'jwt-decode';

import Login from './pages/Auth/Login';
import Home from './pages/KeepIt/Home';
import ProfilePage from './pages/KeepIt/ProfilePage';
import DepartmentPage from './pages/KeepIt/DepartmentPage';
import useDocsPage from './pages/KeepIt/useDocsPage';

import { loginAddress, userInfo } from './util/restAddress';

export default withRouter(function App() {
  const [state, setState] = useState({});
  let history = useHistory();
  const logoutHandler = () => {
    setState({
      token: null,
      tokenInfo: null,
      authLoading: false,
      error: null,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('expiryDate');
    history.push('/');
  };
  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };
  const loginHandler = async (e, authData) => {
    e.preventDefault();
    setState({ authLoading: true });
    console.log(authData);
    const tempResp = await fetch(loginAddress, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
    });
    const resp = await tempResp.json();
    console.log();
    try {
      if (resp.status === 422) {
        throw new Error('Validation failed.');
      }
      if (resp.status !== 200 && resp.status !== 201) {
        console.log('Error!');
        throw new Error('Could not authenticate you!');
      }
      const tokenDecode = jwtDecode(resp.data.token);
      setState({
        tokenInfo: tokenDecode,
        token: resp.data.token,
        authLoading: false,
      });
      localStorage.setItem('token', resp.data.token);
      localStorage.setItem('userID', tokenDecode.userID);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      setAutoLogout(remainingMilliseconds);
    } catch (error) {
      UIkit.modal.dialog(`<p class="uk-modal-body">${error.message}</p>`);
      setState({
        token: null,
        tokenInfo: null,
        authLoading: false,
        error: error,
      });
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    // const isAuth = localStorage.getItem('isAuth') === 'true';
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    const tokenDecode = jwtDecode(token);
    setState({
      token: token,
      tokenInfo: tokenDecode,
      authLoading: false,
    });
    setAutoLogout(remainingMilliseconds);
    return () => {};
  }, []);
  let routes = (
    <>
      <Route
        path="/"
        exact
        render={(props) => (
          <Login
            {...props}
            onLogin={loginHandler}
            loading={state.authLoading}
          />
        )}
      />
      {/* /home definido só para testes */}
    </>
  );
  // Quando estiver feito à autenticação, colocar o if a apontar para variavel
  if (state.token) {
    // alterar o componente a que está a fazer render
    routes = (
      <>
        <Route
          path="/"
          exact
          render={(props) => (
            <Home
              {...props}
              tokenInfo={state.tokenInfo}
              onLogout={logoutHandler}
            />
          )}
        />
        <Route
          path="/profile"
          exact
          render={(props) => (
            <ProfilePage {...props} onLogout={logoutHandler} />
          )}
        />
        <Route
          path="/department"
          exact
          render={(props) => (
            <DepartmentPage {...props} onLogout={logoutHandler} />
          )}
        />
        <Route
          path="/useDocs"
          exact
          render={(props) => (
            <DepartmentPage {...props} onLogout={logoutHandler} />
          )}
        />
      </>
    );
  }
  return (
    <Switch>
      {routes}
      <Redirect to="/" />
    </Switch>
  );
});
