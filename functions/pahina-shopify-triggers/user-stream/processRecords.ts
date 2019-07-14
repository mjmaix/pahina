import { DynamoDBStreamEvent } from 'aws-lambda';
import AwsDynamoDB from './connections/AwsDynamoDB';
import { DynamoDB } from 'aws-sdk';
import { ProcessingError } from './utils/ProcessingError';
import { generateSkuPrefix } from './generate-sku-prefix';

export const processRecords = async ({ Records }: DynamoDBStreamEvent) => {
  try {
    await Promise.all(
      Records.map(async ({ eventName, eventID, dynamodb }) => {
        console.log(eventID);
        console.log(eventName);
        console.log('DynamoDB Record: %j', dynamodb);
        if (!dynamodb) {
          return;
        }

        switch (eventName) {
          case 'INSERT':
            const image = dynamodb.NewImage;
            if (process.env.USER_STORE_TABLE_NAME && image) {
              const params: DynamoDB.Types.PutItemInput = {
                TableName: process.env.USER_STORE_TABLE_NAME,
                Item: {
                  ownerId: image['id'],
                  skuPrefix: { S: generateSkuPrefix() },
                  // @ts-ignore
                  updatedAt: { S: new Date(Date.now()).toString() },
                  // @ts-ignore
                  createdAt: { S: new Date(Date.now()).toString() },
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
            break;
          case 'MODIFY':
            break;
          case 'REMOVE':
            break;
          default:
            throw new ProcessingError(`Unknown event ${eventName}`);
        }
      }),
    );
  } catch (err) {
    throw err;
  }
};
