import AwsDynamoDB from '../connections/AwsDynamoDB';
import { ProcessingError } from '../utils/ProcessingError';
import { pretty } from '../utils/simpleUtils';

import { getBatchParams } from './getBatchParams';
import { getUserStoreQueryParam } from './getUserStoreQueryParam';

export async function fetchRequiredData(image: NoteRecord) {
  if (!process.env.USER_STORE_TABLE_NAME) {
    throw new ProcessingError('USER_STORE_TABLE_NAME is empty');
  }

  if (!process.env.USER_TABLE_NAME) {
    throw new ProcessingError('USER_TABLE_NAME is empty');
  }
  if (!process.env.CASE_TABLE_NAME) {
    throw new ProcessingError('CASE_TABLE_NAME is empty');
  }

  let storeRecord: PahinaStoreRecord | null = null;
  let userRecord: UserRecord | null = null;
  let caseRecord: CaseRecord | null = null;
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
  return { storeRecord, userRecord, caseRecord };
}
