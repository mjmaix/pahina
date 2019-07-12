import { CognitoUserPoolTriggerEvent, Context, Callback } from 'aws-lambda';

exports.handler = (
  event: CognitoUserPoolTriggerEvent,
  context: Context,
  callback: Callback,
) => {
  // insert code to be executed by your lambda trigger
  callback(null, event);
};
