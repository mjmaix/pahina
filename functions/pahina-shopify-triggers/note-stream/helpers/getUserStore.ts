import AwsDynamoDB from '../connections/AwsDynamoDB';
import { ProcessingError } from '../utils/ProcessingError';
import { pretty } from '../utils/simpleUtils';
import {
  PahinaNoteRecord,
  PahinaStoreRecord,
  PahinaUserRecord,
  BatchGetItemInput,
  BatchGetItemOutput,
} from '../types';
import { getBatchParams } from './getBatchParams';

export async function fetchUserStore(image: PahinaNoteRecord) {
  if (!process.env.USER_STORE_TABLE_NAME) {
    throw new ProcessingError('USER_STORE_TABLE_NAME is empty');
  }

  if (!process.env.USER_TABLE_NAME) {
    throw new ProcessingError('USER_TABLE_NAME is empty');
  }

  let store: PahinaStoreRecord | null = null;
  let user: PahinaUserRecord | null = null;
  try {
    const params: BatchGetItemInput = getBatchParams(image);
    const data: BatchGetItemOutput = await AwsDynamoDB.batchGetItem(params);
    console.log('[SUCCESS] batch UserStore, UserStore', pretty(data));
    const { Responses } = data;
    if (Responses) {
      const stores = (Responses[
        process.env.USER_STORE_TABLE_NAME
      ] as unknown) as PahinaStoreRecord[];
      const users = (Responses[
        process.env.USER_TABLE_NAME
      ] as unknown) as PahinaUserRecord[];
      if (stores.length > 0) {
        store = stores[0];
      }
      if (users.length > 0) {
        user = users[0];
      }
    }
  } catch (err) {
    console.log('[ERROR] batch UserStore, UserStore', err);
    throw err;
  }
  return { store, user };
}
