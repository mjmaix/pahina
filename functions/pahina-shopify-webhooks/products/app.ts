import { Context, APIGatewayEvent } from 'aws-lambda';

console.log('Loading function');

export const handler = async (event: APIGatewayEvent, context: Context) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log('Received context:', JSON.stringify(context, null, 2));
  const response = {
    statusCode: 200,
    body: JSON.stringify(event, null, 2),
  };
  return response;
};
