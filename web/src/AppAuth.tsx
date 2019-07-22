import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { Hub, Auth } from 'aws-amplify';
import { HubCallback } from '@aws-amplify/core/lib/Hub';

import { SignInScreen } from './screens/SignInScreen';
import { Header } from './screens/Header';
import Router from './AppRouter';
import { logInfo } from './shared';

import { SystemAlerts } from './System/SystemAlerts';

class AuthenticatedApp extends Component {
  public async componentDidMount() {
    Hub.listen('auth', this.authListener);
  }

  public authListener: HubCallback = async data => {
    logInfo('[START]', 'authListener');
    switch (data.payload.event) {
      case 'signIn':
        const currentSession = await Auth.currentSession();
        console.log(
          'currentSession.getIdToken().getJwtToken()',
          currentSession.getIdToken().getJwtToken(),
        );
        break;
      case 'signOut':
        break;
    }
  };

  render() {
    return (
      <div>
        <Header />
        <SystemAlerts />
        <Router />
      </div>
    );
  }
}

export default withAuthenticator(AuthenticatedApp, false, [<SignInScreen />]);
