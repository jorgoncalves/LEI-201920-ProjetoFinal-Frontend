import React, { useState } from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { required, length, email } from '../../util/validators';
import Auth from './Auth';

function Login() {
  const [state, setState] = useState({
    loginForm: {
      email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email],
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })],
      },
      formIsValid: false,
      loading: false,
    },
  });
  const loginHandler = async (event, authData) => {
    event.preventDefault();
    state.loading = true;
    console.log(state);
    // fetch('http://localhost:8080/auth/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: authData.email,
    //     password: authData.password,
    //   }),
    // })
    //   .then((res) => {
    //     if (res.status === 422) {
    //       throw new Error('Validation failed.');
    //     }
    //     if (res.status !== 200 && res.status !== 201) {
    //       console.log('Error!');
    //       throw new Error('Could not authenticate you!');
    //     }
    //     return res.json();
    //   })
    //   .then((resData) => {
    //     console.log(resData);
    //     this.setState({
    //       isAuth: true,
    //       token: resData.token,
    //       authLoading: false,
    //       userId: resData.userId,
    //     });
    //     localStorage.setItem('token', resData.token);
    //     localStorage.setItem('userId', resData.userId);
    //     const remainingMilliseconds = 60 * 60 * 1000;
    //     const expiryDate = new Date(
    //       new Date().getTime() + remainingMilliseconds
    //     );
    //     localStorage.setItem('expiryDate', expiryDate.toISOString());
    //     this.setAutoLogout(remainingMilliseconds);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.setState({
    //       isAuth: false,
    //       authLoading: false,
    //       error: err,
    //     });
    //   });
  };
  const inputChangeHandler = (input, value) => {
    let isValid = true;

    for (const validator of state.loginForm[input].validators) {
      isValid = isValid && validator(value);
    }
    const updatedForm = {
      ...state.loginForm,
      [input]: {
        ...state.loginForm[input],
        valid: isValid,
        value: value,
      },
    };
    let formIsValid = true;
    for (const inputName in updatedForm) {
      formIsValid = formIsValid && updatedForm[inputName].valid;
    }

    setState({
      ...state,
      loginForm: { ...updatedForm, formIsValid },
    });
    // setState((formIsValid = formIsValid));
  };
  const inputBlurHandler = (input) => {
    console.log(input);
    setState({
      loginForm: { ...state.loginForm },
      [input]: {
        ...state.loginForm[input],
        touched: true,
      },
    });
  };
  return (
    <Auth>
      <form
        onSubmit={(e) =>
          loginHandler(e, {
            email: state.loginForm.email.value,
            password: state.loginForm.password.value,
          })
        }
      >
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'email')}
          value={state.loginForm['email'].value}
          valid={state.loginForm['email'].valid}
          touched={state.loginForm['email'].touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'password')}
          value={state.loginForm['password'].value}
          valid={state.loginForm['password'].valid}
          touched={state.loginForm['password'].touched}
        />
        <Button design="raised" type="submit" loading={state.loading}>
          Login
        </Button>
      </form>
    </Auth>
  );
}

export default Login;
