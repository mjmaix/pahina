// @ts-ignore
import AWSAppSyncClient from 'aws-appsync';

// @ts-ignore
import awsmobile from './aws-exports';
import { Auth } from 'aws-amplify';
import { AuthOptions } from 'aws-appsync/lib/link/auth-link';
import ApolloClient from 'apollo-client';

class Singleton {
  public static instance?: ApolloClient<any>;

  private constructor() {}

  public static Instance() {
    if (!Singleton.instance) {
      Singleton.instance = new AWSAppSyncClient({
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
    }
    return Singleton.instance;
  }
}

// const instance = new AWSAppSyncClient({
//   url: awsmobile.aws_appsync_graphqlEndpoint,
//   region: awsmobile.aws_appsync_region,
//   auth: {
//     type: awsmobile.aws_appsync_authenticationType,
//     credentials: () => Auth.currentCredentials(),
//     jwtToken: async () =>
//       (await Auth.currentSession()).getAccessToken().getJwtToken(),
//   } as AuthOptions,
//   complexObjectsCredentials: () => Auth.currentCredentials(),
// });

export default Singleton.Instance();
