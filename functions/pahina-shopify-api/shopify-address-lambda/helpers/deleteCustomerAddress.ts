import ShopifyRest from '../../../shared/shopify/ShopifyRest';
import { getCustomer } from './getCustomer';

export const deleteCustomerAddress = async (
  claim: AuthorizerClaims,
  addressId: string,
) => {
  const customer: ShopifyCustomer = await getCustomer(claim);

  const response = await ShopifyRest.delete(
    `customers/${customer.id}/addresses`,
    addressId,
  );
  return response;
};
