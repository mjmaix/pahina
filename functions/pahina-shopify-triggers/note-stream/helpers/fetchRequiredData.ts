import keyBy from 'lodash.keyby';
import AwsDynamoDB from '../connections/AwsDynamoDB';
import AwsCognitoIdentity from '../connections/AwsCognitoIdentity';
import { ProcessingError } from '../utils/ProcessingError';
import { pretty } from '../utils/simpleUtils';

import { getBatchParams } from './getBatchParams';
import { getUserStoreQueryParam } from './getUserStoreQueryParam';

const UNAUTH_USER_TYPES: UserStatusType[] = ['ARCHIVED', 'COMPROMISED'];

export async function fetchRequiredData(image: NoteRecord) {
  if (!process.env.USER_POOL_ID) {
    throw new ProcessingError('USER_POOL_ID is empty');
  }
  if (!process.env.USER_STORE_TABLE_NAME) {
    throw new ProcessingError('USER_STORE_TABLE_NAME is empty');
  }
  if (!process.env.USER_TABLE_NAME) {
    throw new ProcessingError('USER_TABLE_NAME is empty');
  }
  if (!process.env.CASE_TABLE_NAME) {
    throw new ProcessingError('CASE_TABLE_NAME is empty');
  }
  if (!image.authorId.S) {
    throw new ProcessingError('User id is empty');
  }

  let cognitoUser: CognitoUser | null = null;
  let storeRecord: PahinaStoreRecord | null = null;
  let userRecord: UserRecord | null = null;
  let caseRecord: CaseRecord | null = null;
  try {
    const data: AdminGetUserResponse = await AwsCognitoIdentity.adminGetUser({
      UserPoolId: process.env.USER_POOL_ID,
      Username: image.authorId.S,
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
  try {
    const params: QueryInput = getUserStoreQueryParam(image);
    const data: QueryOutput = await AwsDynamoDB.query(params);
    console.log('[SUCCESS] query UserStore', pretty(data));
    const { Items } = data;
    const stores = (Items as unknown) as PahinaStoreRecord[];
    if (stores.length > 0) {
      storeRecord = stores[0];
    }
  } catch (err) {
    console.log('[ERROR] query UserStore', pretty(err));
  }

  try {
    const params: BatchGetItemInput = getBatchParams(image);
    const data: BatchGetItemOutput = await AwsDynamoDB.batchGetItem(params);
    console.log('[SUCCESS] batch User, Case', pretty(data));
    const { Responses } = data;
    if (Responses) {
      const users = (Responses[
        process.env.USER_TABLE_NAME
      ] as unknown) as UserRecord[];
      const cases = (Responses[
        process.env.CASE_TABLE_NAME
      ] as unknown) as CaseRecord[];

      if (users.length > 0) {
        userRecord = users[0];
      }
      if (cases.length > 0) {
        caseRecord = cases[0];
      }
    }
  } catch (err) {
    console.log('[ERROR] batch UserStore, UserStore, Case', err);
    throw err;
  }
  return { storeRecord, userRecord, caseRecord, cognitoUser };
}
