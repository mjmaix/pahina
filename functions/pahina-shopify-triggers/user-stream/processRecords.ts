import { DynamoDBStreamEvent } from 'aws-lambda';

import { ProcessingError } from './utils/ProcessingError';
import { processInsertRecord } from './processInsertRecord';

export const processRecords = async ({ Records }: DynamoDBStreamEvent) => {
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
          await processInsertRecord(dynamodb);
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
};
