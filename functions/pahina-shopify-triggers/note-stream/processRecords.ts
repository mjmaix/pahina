import { DynamoDBStreamEvent } from 'aws-lambda';

import { ProcessingError } from '../../shared/utils/ProcessingError';

import { processInsertRecord } from './processInsertRecord';
import { processModifyRecord } from './processModifyRecord';
import { makeGqlRemove as processRemovedRecord } from './processRemoveRecord';

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
            return processInsertRecord(dynamodb);
          case 'MODIFY':
            return processModifyRecord(dynamodb);
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
