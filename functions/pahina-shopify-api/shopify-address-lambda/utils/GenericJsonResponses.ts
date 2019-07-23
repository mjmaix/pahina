import { APIGatewayProxyResult } from 'aws-lambda';

export const ERR_400_BAD_REQUEST: APIGatewayProxyResult = {
  statusCode: 400,
  body: JSON.stringify({
    message: 'Bad Request',
  }),
};

export const ERR_401_UNAUTHORIZED: APIGatewayProxyResult = {
  statusCode: 401,
  body: JSON.stringify({
    message: 'Unauthorized',
  }),
};

export const ERR_500_INTERNAL_SERVER_ERROR: APIGatewayProxyResult = {
  statusCode: 500,
  body: JSON.stringify({
    message: 'Internal Server Error',
  }),
};
