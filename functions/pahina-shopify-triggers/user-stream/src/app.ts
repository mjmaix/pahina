import { DynamoDBStreamEvent, Context } from 'aws-lambda';

import { processRecords } from './processRecords';

console.log('Loading function');

export const handler = async (event: DynamoDBStreamEvent, context: Context) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log('Received context:', JSON.stringify(context, null, 2));
  await processRecords(event);
  return `Successfully processed ${event.Records.length} records.`;
};
