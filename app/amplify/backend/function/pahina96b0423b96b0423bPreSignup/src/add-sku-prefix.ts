import { CognitoUserPoolTriggerEvent, Context, Callback } from 'aws-lambda';
import short from 'short-uuid';

const skuTranslator = short(
  'ABCDEFHJKMNPQRSTUVWXYZabcdefghjkmnqrstuvwxyz01234567890',
);

exports.handler = (
  event: CognitoUserPoolTriggerEvent,
  context: Context,
  callback: Callback,
) => {
  const skuPrefix = skuTranslator.generate();

  event.request.userAttributes['custom:sku_prefix'] = skuPrefix;

  callback(null, event);
};
