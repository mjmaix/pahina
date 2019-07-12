import { DynamoDBStreamEvent } from 'aws-lambda';
import { ProcessingError } from './utils/ProcessingError';
import AwsDynamoDB from './connections/AwsDynamoDB';
import { DynamoDB } from 'aws-sdk';

export const processRecords = ({ Records }: DynamoDBStreamEvent) => {
  try {
    Records.map(({ eventName, eventID, dynamodb }) => {
      console.log(eventID);
      console.log(eventName);
      console.log('DynamoDB Record: %j', dynamodb);
      if (!dynamodb) {
        return;
      }

      switch (eventName) {
        case 'INSERT':
          if (process.env.UserStoreTableName) {
            const params: DynamoDB.Types.PutItemInput = {
              TableName: process.env.UserStoreTableName,
              Item: {
                ownerId: { N: '001' },
                skuPrefix: { S: 'Richard Roe' },
                updatedAt: { S: '2019-05-09T05:57:43.148Z' },
                createddAt: { S: '2019-04-08T21:15:02.337Z' },
                __typename: { S: 'PahinaUserStore' },
              },
            };
            AwsDynamoDB.putItem(params);
          }
          break;
        case 'MODIFY':
          break;
        case 'REMOVE':
          break;
        default:
          throw new ProcessingError(`Unknown event ${eventName}`);
      }
    });
  } catch (err) {
    throw err;
  }
};
