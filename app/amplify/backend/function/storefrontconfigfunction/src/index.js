const AwsSSM = require('./AwsSSM').default;

exports.handler = async (event, context) => {
  if (!process.env.ENV) {
    throw new Error('[ERROR] ENV param not provided');
  }
  if (!process.env.SHOPIFY_HOST) {
    throw new Error('[ERROR] SHOPIFY_HOST param not provided');
  }

  const env = process.env.ENV;
  const host = process.env.SHOPIFY_HOST;

  const keyPath = `/${host}/${env}/Storefront`;

  const accessToken = await AwsSSM.getParam(keyPath);
  return { accessToken };
};
