/*
  this file will loop through all js modules which are uploaded to the lambda resource,
  provided that the file names (without extension) are included in the "MODULES" env variable.
  "MODULES" is a comma-delimmited string.
*/
import { CognitoUserPoolTriggerEvent, Context, Callback } from 'aws-lambda';

exports.handler = (
  event: CognitoUserPoolTriggerEvent,
  context: Context,
  callback: Callback,
) => {
  const modules = (process.env.MODULES || '').split(',');
  // tslint:disable-next-line
  for (let i = 0; i < modules.length; i += 1) {
    const { handler } = require(modules[i]);
    handler(event, context, callback);
  }
};
