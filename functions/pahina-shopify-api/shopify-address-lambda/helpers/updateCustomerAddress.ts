import ShopifyRest from '../../../shared/shopify/ShopifyRest';
import { getCustomer } from './getCustomer';

interface Body {
  address: { [k: string]: any };
}

export const updateCustomerAddress = async (
  claim: AuthorizerClaims,
  addressId: string,
  body: Body,
) => {
  const customer: ShopifyCustomer = await getCustomer(claim);

  const response = await ShopifyRest.put<Body>(
    body,
    `customers/${customer.id}/addresses/${addressId}`,
  );
  return response;
};
