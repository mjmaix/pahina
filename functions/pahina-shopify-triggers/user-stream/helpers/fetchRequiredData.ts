import AwsCognitoIdentity from '../connections/AwsCognitoIdentity';
import { ProcessingError } from '../utils/ProcessingError';
import { pretty } from '../utils/simpleUtils';

import keyBy from 'lodash.keyby';

const UNAUTH_USER_TYPES: UserStatusType[] = ['ARCHIVED', 'COMPROMISED'];

export async function fetchRequiredData(image: UserRecord) {
  if (!process.env.USER_POOL_ID) {
    throw new ProcessingError('USER_POOL_ID is empty');
  }

  if (!image.id.S) {
    throw new ProcessingError('User id is empty');
  }

  let cognitoUser: CognitoUser | null = null;

  try {
    const data: AdminGetUserResponse = await AwsCognitoIdentity.adminGetUser({
      UserPoolId: process.env.USER_POOL_ID,
      Username: image.id.S,
    });
    if (UNAUTH_USER_TYPES.includes(data.UserStatus || '')) {
      console.log(`[ERROR] unauth user`, pretty(data));
      throw new ProcessingError('Cognito User is not allowed to proceed');
    }
    console.log('[SUCCESS] get Cognito User', pretty(data));
    const { UserAttributes } = data;
    if (!UserAttributes) {
      throw new ProcessingError('UserAttributes is empty');
    }
    cognitoUser = {
      ...data,
      userAttributes: (keyBy(
        UserAttributes,
        'Name',
      ) as unknown) as CognitoUserAttrs,
    };
    console.log('AdminGetUserResponse', pretty(data));
    console.log('Transformed CognitoUserAttr', pretty(cognitoUser));
  } catch (err) {
    console.log('[ERROR] get Cognito User', err);
    throw err;
  }
  return { cognitoUser };
}
