import { DynamoDBStreamEvent, Context } from 'aws-lambda';

import { processRecords } from './processRecords';

console.log('Loading function');

export const handler = async (event: DynamoDBStreamEvent, context: Context) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  const gqls: string[] = processRecords(event);
  console.log('GraphQL mutations', gqls);
  return `Successfully processed ${event.Records.length} records.`;
};
