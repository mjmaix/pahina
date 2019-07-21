import { DynamoDBStreamEvent } from 'aws-lambda';

import { ProcessingError } from '../shared/utils/ProcessingError';

import { processInsertedRecord } from './processInsertedRecord';
import { processModifiedRecord } from './processModifiedRecord';
import { makeGqlRemove as processRemovedRecord } from './processRemovedRecord';

import bluebird from 'bluebird';

export const processRecords = async ({ Records }: DynamoDBStreamEvent) => {
  try {
    const responses = await bluebird.map(
      Records,
      ({ eventName, eventID, dynamodb }) => {
        console.log(eventID);
        console.log(eventName);
        console.log('DynamoDB Record: %j', dynamodb);
        if (!dynamodb) {
          return '';
        }

        switch (eventName) {
          case 'INSERT':
            return processInsertedRecord(dynamodb);
          case 'MODIFY':
            return processModifiedRecord(dynamodb);
          case 'REMOVE':
            return processRemovedRecord(dynamodb);
          default:
            throw new ProcessingError(`Unknown event ${eventName}`);
        }
      },
      { concurrency: 3 },
    );
    return responses;
  } catch (err) {
    throw err;
  }
};
