import React from 'react';

import { SignInScreen } from './screens/SignInScreen';
import { withAuthenticator } from 'aws-amplify-react';
import Router from './Router';
import { Header } from './screens/Header';

const AuthenticatedApp: React.FC = () => {
  return (
    <div>
      <Header />
      <Router />
    </div>
  );
};

export default withAuthenticator(AuthenticatedApp, false, [<SignInScreen />]);
