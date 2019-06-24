import React from "react"

import { Button } from 'reactstrap';

import logo from './logo.svg';
import './App.css';
import { handleSignOut } from '@pahina/core/dist/src/actions';
import { SignInScreen } from './screens/SignInScreen';
import { withAuthenticator } from 'aws-amplify-react';

const App: React.FC = () => {
  return (
    <div className="App">
      {
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button onClick={() => handleSignOut()}>Sign out</Button>
        </header>
      }
    </div>
  );
};

export default withAuthenticator(App, false, [<SignInScreen />]);
