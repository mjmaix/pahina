import { ProcessingError } from '../utils/ProcessingError';

import { Response } from 'node-fetch';

export const validateShopifyResponse = async (
  resp: Response,
  expectedSig: string,
) => {
  const json = await resp.json();
  const shopifyHmac256 = json.headers['X-Shopify-Hmac-SHA256'];
  if (shopifyHmac256 !== expectedSig) {
    throw new ProcessingError(
      `[ERROR] digital signature ${expectedSig} !== ${shopifyHmac256}`,
    );
  }
};
