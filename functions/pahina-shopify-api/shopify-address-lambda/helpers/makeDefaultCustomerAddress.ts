import ShopifyRest from '../../../shared/shopify/ShopifyRest';
import { getCustomer } from './getCustomer';

interface Body {}

export const makeDefaultCustomerAddress = async (
  claim: AuthorizerClaims,
  addressId: string,
) => {
  const customer: ShopifyCustomer = await getCustomer(claim);

  const response = await ShopifyRest.put<Body>(
    {},
    `customers/${customer.id}/addresses/${addressId}/default`,
  );
  return response;
};
