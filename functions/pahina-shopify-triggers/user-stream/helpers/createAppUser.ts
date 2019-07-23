import { DynamoDB } from 'aws-sdk';
import short from 'short-uuid';

import { ProcessingError } from '../../../shared/utils/ProcessingError';
import { isoNow } from '../../../shared/utils/simpleUtils';
import AwsDynamoDB from '../../../shared/aws/AwsDynamoDB';

import { generateSkuPrefix } from '../generate-sku-prefix';

export async function createAppUser(userRecord: UserRecord) {
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
