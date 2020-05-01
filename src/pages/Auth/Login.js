import React from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { required, length, email } from '../../util/validators';
import Auth from './Auth';

function Login(props) {
  const state = {
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
    },
  };
  const inputChangeHandler = () => {}
  const inputBlurHandler = () => {}
  return (
    <Auth>
      <form
        onSubmit={(e) =>
          this.props.onLogin(e, {
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
        <Button design="raised" type="submit" loading={props.loading}>
          Login
        </Button>
      </form>
    </Auth>
  );
}

export default Login;
