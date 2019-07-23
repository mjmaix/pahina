import { StreamRecord } from 'aws-lambda';

import { ProcessingError } from '../../shared/utils/ProcessingError';

import { createShopifyCustomer } from './helpers/createShopifyCustomer';
import { createAppUser } from './helpers/createAppUser';

export const processInsertRecord = async (Record: StreamRecord) => {
  if (!Record.NewImage) {
    throw new ProcessingError('NewImage is empty, not an insert!');
  }
  if (!process.env.USER_STORE_TABLE_NAME) {
    throw new ProcessingError('process.env.USER_STORE_TABLE_NAME is empty');
  }

  const userRecord = (Record.NewImage as unknown) as UserRecord;

  await createAppUser(userRecord);
  await createShopifyCustomer(userRecord);

  return '[RECORD] insert processed';
};
