import {
  APIGatewayEvent,
  Context,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';

import {
  ERR_400_BAD_REQUEST,
  ERR_401_UNAUTHORIZED,
  ERR_500_INTERNAL_SERVER_ERROR,
} from './utils';
import {
  getCustomerAddresses,
  updateCustomerAddress,
  createCustomerAddress,
  makeDefaultCustomerAddress,
  deleteCustomerAddress,
} from './helpers';
import { pretty, ConfigError } from '../../shared/utils';

const ADDRESS_ID_POSITION = 3;
let response: APIGatewayProxyResult;

const lambdaHandler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context,
) => {
  if (!process.env.ENV) {
    throw new ConfigError('ENV is empty');
  }

  console.log('[EVENT]', pretty(event));
  console.log('[CONTEXT]', pretty(context));

  const { authorizer, path } = event.requestContext;
  if (!authorizer) {
    return ERR_401_UNAUTHORIZED;
  }

  if (!path.startsWith(`/${process.env.ENV}/addresses`)) {
    console.log('[DEBUG] path', path);
    response = ERR_400_BAD_REQUEST;
    return response;
  }

  const user = authorizer.claims as AuthorizerClaims;

  const method = event.httpMethod;
  switch (method) {
    case 'GET': {
      console.log('[GET] request start');
      response = await getActions(user);
      break;
    }
    case 'POST': {
      if (!event.body) {
        response = ERR_400_BAD_REQUEST;
      } else {
        try {
          console.log('[POST] request start');
          const body = JSON.parse(event.body);

          response = await postAction(body, user);
        } catch (err) {
          console.log('[ERROR]', pretty(err));
          response = ERR_500_INTERNAL_SERVER_ERROR;
        }
      }

      break;
    }
    case 'PUT': {
      console.log('[PUT] request start');
      const parsePath = path.split('/'); // "/dev/addresses/2275595124845" => ["", "dev", "addresses", "2275595124845"]
      const addressId = parsePath[ADDRESS_ID_POSITION];
      const isMakeDefault = parsePath[ADDRESS_ID_POSITION + 1] === 'default';

      if (isMakeDefault) {
        response = await makeDefaultAction(user, addressId);
      } else {
        if (!event.body) {
          response = ERR_400_BAD_REQUEST;
        } else {
          const body = JSON.parse(event.body);
          response = await updateActions(body, user, addressId);
        }
      }
      break;
    }
    case 'DELETE': {
      console.log('[DELETE] request start');
      response = await deletAction(path, user);
      break;
    }
    default: {
      console.log(`[${method}] not supported`);
      response = ERR_400_BAD_REQUEST;
      break;
    }
  }

  return response;
};

export { lambdaHandler };

async function makeDefaultAction(user: AuthorizerClaims, addressId: string) {
  const makeDefaultResp = await makeDefaultCustomerAddress(user, addressId);
  const customerAddress = await makeDefaultResp.json();
  response = {
    statusCode: 200,
    body: JSON.stringify(customerAddress),
  };
  return response;
}

async function updateActions(
  body: any,
  user: AuthorizerClaims,
  addressId: string,
) {
  const updateResp = await updateCustomerAddress(user, addressId, body);
  const customerAddress = await updateResp.json();
  response = {
    statusCode: 200,
    body: JSON.stringify(customerAddress),
  };
  return response;
}

async function getActions(user: AuthorizerClaims) {
  const addresses = await getCustomerAddresses(user);
  response = {
    statusCode: 200,
    body: JSON.stringify(addresses),
  };
  return response;
}

async function deletAction(path: string, user: AuthorizerClaims) {
  const parsePath = path.split('/');
  const addressId = parsePath[ADDRESS_ID_POSITION];
  const deleteResp = await deleteCustomerAddress(user, addressId);
  const customerAddress = await deleteResp.json();
  response = {
    statusCode: 200,
    body: JSON.stringify(customerAddress),
  };
  return response;
}

async function postAction(body: any, user: AuthorizerClaims) {
  const createResp = await createCustomerAddress(user, body);
  const customerAddress = await createResp.json();
  response = {
    statusCode: 200,
    body: JSON.stringify(customerAddress),
  };
  return response;
}
