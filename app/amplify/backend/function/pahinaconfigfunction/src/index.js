const AwsSSM = require('./AwsSSM').default;

exports.handler = async (event, context) => {
  if (!process.env.ENV) {
    throw new Error('[ERROR] ENV param not provided');
  }
  if (!process.env.SHOPIFY_HOST) {
    throw new Error('[ERROR] SHOPIFY_HOST param not provided');
  }

  const env = process.env.ENV;
  const shopifyHost = process.env.SHOPIFY_HOST;

  const storefrontKeyPath = `/${shopifyHost}/${env}/Storefront`;
  const shopifyStorefrontAccessToken = await AwsSSM.getParam(storefrontKeyPath);
  if (!shopifyStorefrontAccessToken) {
    throw new Error(`[ERROR] ${storefrontKeyPath} param not provided`);
  }

  const pahinaConfigPath = `/pahina-config/${env}`;
  const pahinaShopifyApiKeyPath = `${pahinaConfigPath}/pahina-shopify-api`;
  await AwsSSM.fetchPath(pahinaConfigPath);
  const pahinaShopifyApi = await AwsSSM.getParam(pahinaShopifyApiKeyPath);
  const webBecomeSellerLearnMorePath = `${pahinaConfigPath}/web/become_seller-learn_more`;
  const webBecomeSellerLearnMore = await AwsSSM.getParam(
    webBecomeSellerLearnMorePath,
  );
  if (!pahinaShopifyApi) {
    throw new Error(`[ERROR] ${pahinaShopifyApiKeyPath} param not provided`);
  }

  return {
    env,
    shopifyStorefrontAccessToken,
    shopifyHost,
    pahinaShopifyApi,
    webBecomeSellerLearnMore,
  };
};
