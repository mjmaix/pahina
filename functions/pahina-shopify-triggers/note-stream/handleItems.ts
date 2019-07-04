import { DynamoDBStreamEvent } from 'aws-lambda';
import { handleItemInsert } from './handleItemInsert';
import { handleItemModify } from './handleItemModify';
import { handleItemRemove } from './handleItemRemove';

export const handleItems = async ({ Records }: DynamoDBStreamEvent) => {
  for (const { eventName, eventID, dynamodb } of Records) {
    console.log(eventID);
    console.log(eventName);
    console.log('DynamoDB Record: %j', dynamodb);
    if (!dynamodb) {
      continue;
    }

    try {
      switch (eventName) {
        case 'INSERT':
          await handleItemInsert(dynamodb);
          break;
        case 'MODIFY':
          await handleItemModify(dynamodb);
          break;
        case 'REMOVE':
          await handleItemRemove(dynamodb);
          break;
        default:
          throw new Error(`Unknown event ${eventName}`);
      }
    } catch (err) {
      console.log(`[ERROR]`, err);
      throw err;
    }
  }
};
