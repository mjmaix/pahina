import { handleItems } from './handleItems';
import { DynamoDBStreamEvent, Context } from 'aws-lambda';

console.log('Loading function');

exports.handler = async (event: DynamoDBStreamEvent, context: Context) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  await handleItems(event);
  return `Successfully processed ${event.Records.length} records.`;
};
