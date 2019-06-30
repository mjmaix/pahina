import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { Hub } from 'aws-amplify';
import { HubCallback } from '@aws-amplify/core/lib/Hub';

import { SignInScreen } from './screens/SignInScreen';
import { Header } from './screens/Header';
import Router from './AppRouter';
import { logInfo } from './shared';
import { Subscribe } from 'unstated';
import { Alert } from 'reactstrap';
import { SystemContainer } from './unstated';

class AuthenticatedApp extends Component {
  public async componentDidMount() {
    Hub.listen('auth', this.authListener);
  }

  public authListener: HubCallback = async data => {
    logInfo('[START]', 'authListener');
    switch (data.payload.event) {
      case 'signIn':
        break;
      case 'signOut':
        break;
    }
  };

  render() {
    return (
      <Subscribe to={[SystemContainer]}>
        {(system: SystemContainer) => {
          if (!system) {
            return null;
          }

          const { successMessage, errorMessage } = system.state;
          const { setSuccessMessage, setErrorMessage } = system;
          return (
            <div>
              <Header />
              <div className="pad-big">
                <Alert
                  color="success"
                  isOpen={!!successMessage}
                  toggle={() => setSuccessMessage(null)}
                >
                  {successMessage}
                </Alert>
                <Alert
                  color="warning"
                  isOpen={!!errorMessage}
                  toggle={() => setErrorMessage(null)}
                >
                  {errorMessage}
                </Alert>
              </div>
              <Router />
            </div>
          );
        }}
      </Subscribe>
    );
  }
}

export default withAuthenticator(AuthenticatedApp, false, [<SignInScreen />]);
