import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';

import './SignInScreen.css';
import { coreActions, coreModels, coreUtils } from '@pahina/core';
import { RouteComponentProps, withRouter } from 'react-router';

const { handleSignIn } = coreActions;
const { SignInModel } = coreModels;
const { logError } = coreUtils;

class SignInScreen extends Component<RouteComponentProps, {}> {
  public readonly state = {
    email: '',
    password: '',
    submitting: false,
  };
  public render() {
    const { email, password, submitting } = this.state;
    const form: typeof SignInModel = {
      email,
      password,
      phone_number: '',
    };
    return (
      <Form className="SignIn-form">
        <h1 className="text-center">Pahina</h1>
        <p className="text-center">hare and sell notes</p>
        <p className="text-center">Welcome to the seller app</p>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="Email"
            id="email"
            placeholder="email"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </FormGroup>

        <Button
          disabled={submitting}
          className="btn-lg btn-dark btn-block"
          onClick={async () => {
            try {
              this.setState({ submitting: true });
              await handleSignIn(form);
              window.location.reload();
            } catch (err) {
              logError(err);
            } finally {
              this.setState({ submitting: false });
            }
          }}
        >
          {submitting ? <Spinner /> : 'Submit'}
        </Button>
      </Form>
    );
  }
}
const SignInScreenWithRouter = withRouter(SignInScreen);

export { SignInScreenWithRouter as SignInScreen };
