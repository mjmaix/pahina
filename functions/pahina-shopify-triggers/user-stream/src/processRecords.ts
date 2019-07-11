import { DynamoDBStreamEvent } from 'aws-lambda';
import { ProcessingError } from './utils/ProcessingError';

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
