import ShopifyRest from '../../../shared/shopify/ShopifyRest';
import { getCustomer } from './getCustomer';

interface Body {
  address: { [k: string]: any };
}

export const createCustomerAddress = async (
  claim: AuthorizerClaims,
  body: Body,
) => {
  const customer: ShopifyCustomer = await getCustomer(claim);

  const response = await ShopifyRest.post<Body>(
    body,
    `customers/${customer.id}/addresses`,
  );
  return response;
};
