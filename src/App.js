import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  // Redirect,
  withRouter,
  useHistory
} from 'react-router-dom';

import UIkit from 'uikit';
import jwtDecode from 'jwt-decode';

import Login from './pages/Auth/Login';
import Home from './pages/KeepIt/Home';
import ProfilePage from './pages/KeepIt/ProfilePage';
import DepartmentPage from './pages/KeepIt/DepartmentPage';
import DocsPage from './pages/KeepIt/DocsPage';
import SubmitDocPage from './pages/KeepIt/SubmitDocPage';
import DetailDocPage from './pages/KeepIt/DetailDocPage';
import AdminPanel from './pages/Admin/AdminPanel';
import UsersManagement from './pages/Admin/Users/UsersManagement';
import UpdateUser from './pages/Admin/Users/UpdateUser';
import DepartmentsManagement from './pages/Admin/Departments/DepartmentsManagement';
import UpdateDepartment from './pages/Admin/Departments/UpdateDepartment';
import SubmitRecord from './pages/KeepIt/SubmitRecord';
import DocLocation from './pages/KeepIt/DocLocation/DocLocation';
import DocLocationList from './pages/KeepIt/DocLocation/DocLocationList';
import Commit from './pages/KeepIt/Commits/Commit';
import About from './pages/KeepIt/AboutPage';

import { loginAddress } from './util/restAddress';
import { getUserInfo } from './util/restCall_users';

export default withRouter(function App() {
  const [state, setState] = useState({});
  let history = useHistory();
  const remainingMilliseconds = 30 * 60 * 1000;
  let autoLogout;
  const logoutHandler = () => {
    setState({
      token: null,
      tokenInfo: null,
      authLoading: false,
      isAdmin: null,
      error: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userDisp');
    localStorage.removeItem('isAdmin');
    // localStorage.removeItem('expiryDate');
    localStorage.removeItem('tokenInfo');
    history.push('/');
  };
  const setAutoLogout = (milliseconds) => {
    autoLogout = setTimeout(() => {
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password
      })
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
      let userInfo = await getUserInfo(tokenDecode.userID);
      localStorage.setItem('token', resp.data.token);
      localStorage.setItem('userID', tokenDecode.userID);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('userDisp', userInfo.user_display);
      localStorage.setItem('tokenInfo', JSON.stringify(tokenDecode));
      localStorage.setItem('isAdmin', tokenDecode.isAdmin);
      console.log(userInfo);
      setState({
        tokenInfo: tokenDecode,
        token: resp.data.token,
        isAdmin: tokenDecode.isAdmin,
        authLoading: false,
        userInfo
      });

      // const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      // localStorage.setItem('expiryDate', expiryDate.toISOString());
      setAutoLogout(remainingMilliseconds);
    } catch (error) {
      UIkit.modal.dialog(`<p class="uk-modal-body">${error.message}</p>`);
      setState({
        token: null,
        tokenInfo: null,
        authLoading: false,
        isAdmin: null,
        error: error,
        userInfo: null
      });
    }
  };
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    const token = localStorage.getItem('token');
    // const expiryDate = localStorage.getItem('expiryDate');
    // const tokenInfo = localStorage.getItem('tokenInfo');
    // const isAdmin = localStorage.getItem('isAdmin');
    if (!token) {
      return;
    }
    // if (new Date(expiryDate) <= new Date()) {
    //   logoutHandler();
    //   return;
    // }
    // const isAuth = localStorage.getItem('isAuth') === 'true';
    // const remainingMilliseconds =
    //   new Date(expiryDate).getTime() - new Date().getTime();
    window.addEventListener('click', () => {
      clearTimeout(autoLogout);
      setAutoLogout(remainingMilliseconds);
    });
    const tokenDecode = jwtDecode(token);

    setState({
      token: token,
      tokenInfo: tokenDecode,
      userInfo: JSON.parse(userInfo),
      isAdmin: tokenDecode.isAdmin,
      authLoading: false
    });

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
  if (state.token && !state.isAdmin) {
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
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/profile"
          exact
          render={(props) => (
            <ProfilePage
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
              state={state}
              setState={setState}
            />
          )}
        />
        <Route
          path="/department"
          exact
          render={(props) => (
            <DepartmentPage
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/useDocs"
          exact
          render={(props) => (
            <DocsPage
              {...props}
              onLogout={logoutHandler}
              title="Documents for Use"
              files="use"
              userInfo={state.userInfo}
              docStatus="approved"
            />
          )}
        />
        <Route
          path="/aprovDocs"
          exact
          render={(props) => (
            <DocsPage
              {...props}
              onLogout={logoutHandler}
              title="Documents for Approval"
              files="aprove"
              userInfo={state.userInfo}
              docStatus="forapproval"
            />
          )}
        />
        <Route
          path="/penDocs"
          exact
          render={(props) => (
            <DocsPage
              {...props}
              onLogout={logoutHandler}
              title="Pending Documents"
              files="pending"
              userInfo={state.userInfo}
              docStatus="pending"
            />
          )}
        />
        <Route
          path="/notApprovDocs"
          exact
          render={(props) => (
            <DocsPage
              {...props}
              onLogout={logoutHandler}
              title="Not Approved Documents"
              files="notaprove"
              docStatus="repproved"
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/obsoleteDocs"
          exact
          render={(props) => (
            <DocsPage
              {...props}
              onLogout={logoutHandler}
              title="Obsolete Documents"
              files="obsolete"
              docStatus="obsolete"
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/newDoc"
          exact
          render={(props) => (
            <SubmitDocPage
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/records/:id"
          exact
          render={(props) => (
            <DetailDocPage
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/submitrecord"
          exact
          render={(props) => (
            <SubmitRecord
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/doclocation"
          exact
          render={(props) => (
            <DocLocation
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/doclocationlist"
          exact
          render={(props) => (
            <DocLocationList
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/commit/:documentID"
          exact
          render={(props) => (
            <Commit
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />

        <Route
          path="/about"
          exact
          render={(props) => (
            <About
              {...props}
              tokenInfo={state.tokenInfo}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        {/* <Route render={() => <Redirect to="/" />} /> */}
      </>
    );
  }
  if (state.token && state.isAdmin) {
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
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/profile"
          exact
          render={(props) => (
            <ProfilePage
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
              state={state}
              setState={setState}
            />
          )}
        />
        <Route
          path="/department"
          exact
          render={(props) => (
            <DepartmentPage
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/useDocs"
          exact
          render={(props) => (
            <DocsPage
              {...props}
              onLogout={logoutHandler}
              title="Documents for Use"
              files="use"
              userInfo={state.userInfo}
              docStatus="approved"
            />
          )}
        />
        <Route
          path="/aprovDocs"
          exact
          render={(props) => (
            <DocsPage
              {...props}
              onLogout={logoutHandler}
              title="Documents for Approval"
              files="aprove"
              userInfo={state.userInfo}
              docStatus="forapproval"
            />
          )}
        />
        <Route
          path="/penDocs"
          exact
          render={(props) => (
            <DocsPage
              {...props}
              onLogout={logoutHandler}
              title="Pending Documents"
              files="pending"
              userInfo={state.userInfo}
              docStatus="pending"
            />
          )}
        />
        <Route
          path="/notApprovDocs"
          exact
          render={(props) => (
            <DocsPage
              {...props}
              onLogout={logoutHandler}
              title="Not Approved Documents"
              files="notaprove"
              docStatus="repproved"
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/obsoleteDocs"
          exact
          render={(props) => (
            <DocsPage
              {...props}
              onLogout={logoutHandler}
              title="Obsolete Documents"
              files="obsolete"
              docStatus="obsolete"
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/newDoc"
          exact
          render={(props) => (
            <SubmitDocPage
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/records/:id"
          exact
          render={(props) => (
            <DetailDocPage
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/submitrecord"
          exact
          render={(props) => (
            <SubmitRecord
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/adminPanel"
          exact
          render={(props) => (
            <AdminPanel
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/usersmanagement"
          exact
          render={(props) => (
            <UsersManagement
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/updateuser"
          exact
          render={(props) => (
            <UpdateUser
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/departmentsmanagement"
          exact
          render={(props) => (
            <DepartmentsManagement
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/updatedepartment"
          exact
          render={(props) => (
            <UpdateDepartment
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/doclocation"
          exact
          render={(props) => (
            <DocLocation
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/doclocationlist"
          exact
          render={(props) => (
            <DocLocationList
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
        <Route
          path="/commit/:documentID"
          exact
          render={(props) => (
            <Commit
              {...props}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />

        <Route
          path="/about"
          exact
          render={(props) => (
            <About
              {...props}
              tokenInfo={state.tokenInfo}
              onLogout={logoutHandler}
              userInfo={state.userInfo}
            />
          )}
        />
      </>
    );
  }

  return <Switch>{routes}</Switch>;
});
