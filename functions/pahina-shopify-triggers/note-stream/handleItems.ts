import { DynamoDBStreamEvent } from 'aws-lambda';

export const handleItems = async ({ Records }: DynamoDBStreamEvent) => {
  for (const record of Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  }
};
