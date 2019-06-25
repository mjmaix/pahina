import React from 'react';

import { SignInScreen } from './screens/SignInScreen';
import { withAuthenticator } from 'aws-amplify-react';
import Main from './Main';
import { Header } from './screens/Header';

const AuthenticatedApp: React.FC = () => {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};

export default withAuthenticator(AuthenticatedApp, false, [<SignInScreen />]);
