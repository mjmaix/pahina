import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient from 'aws-appsync';
import { AuthOptions } from 'aws-appsync/lib/link/auth-link';

// @ts-ignore
import awsmobile from '@pahina/backend/src/aws-exports';

Amplify.configure(awsmobile);

// TODO: refactor to separate module
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
