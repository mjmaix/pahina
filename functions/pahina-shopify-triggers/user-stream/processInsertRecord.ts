import { StreamRecord } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import short from 'short-uuid';

import { ProcessingError } from '../shared/utils/ProcessingError';
import AwsDynamoDB from '../shared/aws/AwsDynamoDB';
import { isoNow } from '../shared/utils/simpleUtils';

import { generateSkuPrefix } from './generate-sku-prefix';
import { createCustomer } from './helpers/actionCreateCustomer';

export const processInsertRecord = async (Record: StreamRecord) => {
  if (!Record.NewImage) {
    throw new ProcessingError('NewImage is empty, not an insert!');
  }
  if (!process.env.USER_STORE_TABLE_NAME) {
    throw new ProcessingError('process.env.USER_STORE_TABLE_NAME is empty');
  }

  const userRecord = (Record.NewImage as unknown) as UserRecord;

  await saveUserStore(userRecord);
  await createCustomer(userRecord);

  return '[RECORD] insert processed';
};

async function saveUserStore(userRecord: UserRecord) {
  if (!process.env.USER_STORE_TABLE_NAME) {
    throw new ProcessingError('process.env.USER_STORE_TABLE_NAME is empty');
  }

  const params: DynamoDB.Types.PutItemInput = {
    TableName: process.env.USER_STORE_TABLE_NAME,
    Item: {
      id: { S: short.uuid().toString() },
      ownerId: userRecord['id'],
      skuPrefix: { S: generateSkuPrefix() },
      updatedAt: { S: isoNow() },
      createdAt: { S: isoNow() },
      __typename: { S: 'PahinaUserStore' },
    },
  };
  try {
    const data = await AwsDynamoDB.putItem(params);
    console.log('[SUCCESS]', data);
  } catch (err) {
    console.log('[ERROR]', err);
  }
}
