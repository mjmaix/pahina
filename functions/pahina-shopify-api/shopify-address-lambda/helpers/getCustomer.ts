import queryString from 'query-string';

import ShopifyRest from '../../../shared/shopify/ShopifyRest';

export const getCustomer = async (claim: AuthorizerClaims) => {
  const queryParam = queryString.stringify({
    query: `email:${claim.email}`,
  });

  const searchResp = await ShopifyRest.get(`customers/search`, queryParam);
  const customers = (await searchResp.json()).customers;
  return customers[0];
};
