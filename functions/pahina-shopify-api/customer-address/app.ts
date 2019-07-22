import { APIGatewayEvent, Context } from 'aws-lambda';

import { pretty } from '../shared/utils/simpleUtils';

// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

exports.read = async (event: APIGatewayEvent, context: Context) => {
  console.log('[EVENT]', pretty(event));
  console.log('[CONTEXT]', pretty(context));
  try {
    // const ret = await axios(url);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'read',
        // location: ret.data.trim()
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

exports.default = async (event: APIGatewayEvent, context: Context) => {
  console.log('[EVENT]', pretty(event));
  console.log('[CONTEXT]', pretty(context));
  try {
    // const ret = await axios(url);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'default',
        // location: ret.data.trim()
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

exports.create = async (event: APIGatewayEvent, context: Context) => {
  console.log('[EVENT]', pretty(event));
  console.log('[CONTEXT]', pretty(context));
  try {
    // const ret = await axios(url);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'create',
        // location: ret.data.trim()
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

exports.delete = async (event: APIGatewayEvent, context: Context) => {
  console.log('[EVENT]', pretty(event));
  console.log('[CONTEXT]', pretty(context));
  try {
    // const ret = await axios(url);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'delete',
        // location: ret.data.trim()
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
