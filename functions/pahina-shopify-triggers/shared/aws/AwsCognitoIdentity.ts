import AWS, { CognitoIdentityServiceProvider } from 'aws-sdk';
import { pretty } from '../utils/simpleUtils';

AWS.config.update({ region: process.env.REGION });

class AwsCognitoIdentity {
  cognito: AWS.CognitoIdentityServiceProvider;
  constructor() {
    this.cognito = new AWS.CognitoIdentityServiceProvider();
  }

  adminGetUser = (
    obj: CognitoIdentityServiceProvider.Types.AdminGetUserRequest,
  ) => {
    console.log('[GetItem]', pretty(obj));
    return this.cognito.adminGetUser(obj).promise();
  };
}

const instance = new AwsCognitoIdentity();

export default instance;
