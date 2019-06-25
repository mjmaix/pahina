import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './SignInScreen.css';
import { handleSignIn } from '@pahina/core/dist/src/actions';
import { SignInModel } from '../../../core/src/models';
import { DeepRequired } from 'utility-types/dist/mapped-types';

export class SignInScreen extends Component<{}, {}> {
  public readonly state = {
    email: '',
    password: '',
  };
  public render() {
    const { email, password } = this.state;
    const form: DeepRequired<typeof SignInModel> = {
      email,
      password,
      phone_number: '',
      family_name: '',
      given_name: '',
      picture: '',
      password_old: '',
      code: '',
      contact: '',
    };
    return (
      <Form className="signin-form">
        <h1 className="text-center">Pahina</h1>
        {/* <h4 className="text-center">Share and sell notes</h4> */}
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
          className="btn-lg btn-dark btn-block"
          onClick={async () => {
            await handleSignIn(form);
          }}
        >
          Submit
        </Button>
      </Form>
    );
  }
}
