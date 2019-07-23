import ShopifyRest from '../../../shared/shopify/ShopifyRest';
import { getCustomer } from './getCustomer';

export const getCustomerAddresses = async (claim: AuthorizerClaims) => {
  const customer: ShopifyCustomer = await getCustomer(claim);

  const resp = await ShopifyRest.get(`customers/${customer.id}/addresses`);
  const addresses = await resp.json();

  return addresses;
};
