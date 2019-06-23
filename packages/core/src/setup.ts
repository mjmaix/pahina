// @ts-ignore
import AWSAppSyncClient from 'aws-appsync';

// @ts-ignore
import awsmobile from './aws-exports';
import Amplify, { Auth } from 'aws-amplify';
import { AuthOptions } from 'aws-appsync/lib/link/auth-link';

Amplify.configure(awsmobile);

export const apolloClient = new AWSAppSyncClient({
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  auth: {
    type: awsmobile.aws_appsync_authenticationType,
    credentials: () => Auth.currentCredentials(),
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken(),
  } as AuthOptions,
  complexObjectsCredentials: () => Auth.currentCredentials(),
});
