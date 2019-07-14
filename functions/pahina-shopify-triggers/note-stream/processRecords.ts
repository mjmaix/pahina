import { DynamoDBStreamEvent } from 'aws-lambda';
import { makeInsertGql } from './makeInsertGql';
import { makeGqlModify } from './makeGqlModify';
import { makeGqlRemove } from './makeGqlRemove';
import { ProcessingError } from './utils/ProcessingError';

export const processRecords = ({ Records }: DynamoDBStreamEvent) => {
  try {
    const gqls: string[] = Records.map(({ eventName, eventID, dynamodb }) => {
      console.log(eventID);
      console.log(eventName);
      console.log('DynamoDB Record: %j', dynamodb);
      if (!dynamodb) {
        return '';
      }

      switch (eventName) {
        case 'INSERT':
          return makeInsertGql(dynamodb);
        case 'MODIFY':
          return makeGqlModify(dynamodb);
        case 'REMOVE':
          return makeGqlRemove(dynamodb);
        default:
          throw new ProcessingError(`Unknown event ${eventName}`);
      }
    });
    return gqls;
  } catch (err) {
    throw err;
  }
};
