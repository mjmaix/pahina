import { DynamoDBStreamEvent } from 'aws-lambda';
import AwsDynamoDB from './connections/AwsDynamoDB';
import { DynamoDB } from 'aws-sdk';

export const processRecords = async ({ Records }: DynamoDBStreamEvent) => {
  if (process.env.USER_STORE_TABLE_NAME) {
    const params: DynamoDB.Types.PutItemInput = {
      TableName: process.env.USER_STORE_TABLE_NAME,
      Item: {
        ownerId: { S: '111111' },
        skuPrefix: { S: 'SKU1' },
        updatedAt: { S: '2019-05-09T05:57:43.148Z' },
        createdAt: { S: '2019-04-08T21:15:02.337Z' },
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

  // try {
  //   await Promise.all(
  //     Records.map(async ({ eventName, eventID, dynamodb }) => {
  //       console.log(eventID);
  //       console.log(eventName);
  //       console.log('DynamoDB Record: %j', dynamodb);
  //       if (!dynamodb) {
  //         return;
  //       }

  //       switch (eventName) {
  //         case 'INSERT':
  //           break;
  //         case 'MODIFY':
  //           break;
  //         case 'REMOVE':
  //           break;
  //         default:
  //           throw new ProcessingError(`Unknown event ${eventName}`);
  //       }
  //     }),
  //   );
  // } catch (err) {
  //   throw err;
  // }
};
