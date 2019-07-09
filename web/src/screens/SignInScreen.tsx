import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';

import './SignInScreen.css';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  logError,
  handleSignIn,
  SignInModel,
  handleAppSyncUserCreate,
} from '../shared';

const initialState = {
  email: '',
  password: '',
  submitting: false,
};

class SignInScreen extends Component<RouteComponentProps, typeof initialState> {
  public readonly state: typeof initialState = initialState;

  public render() {
    const { email, password, submitting } = this.state;
    const form: SignInModel = {
      email,
      password,
      phone_number: '',
    };
    return (
      <Form className="SignIn-form">
        <h1 className="text-center">Pahina</h1>
        <p className="text-center">share and sell notes</p>
        <p className="text-center">(seller app)</p>
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
              const user = await handleSignIn(form);
              if (user.challengeName) {
                // Should complete registration using app
              } else if (!user.challengeName) {
                await handleAppSyncUserCreate();
              }
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
