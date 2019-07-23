import { ProcessingError } from '../../../shared/utils/ProcessingError';

export function generateShopifyCustomer(
  cognitoUser: CognitoUser,
  address?: any,
) {
  const attrs = cognitoUser.userAttributes;
  if (!attrs.email.Value) {
    throw new ProcessingError('[ERROR] Email is required');
  }
  const first_name = attrs.given_name.Value;
  const last_name = attrs.family_name.Value;
  const email = attrs.email.Value;
  const phone = attrs.phone ? attrs.phone.Value : undefined;
  const verified_email = cognitoUser.UserStatus === 'CONFIRMED';

  const param: ShopifyCustomerInput = {
    customer: {
      first_name,
      last_name,
      email,
      phone,
      verified_email,
    },
  };

  if (address) {
    param.customer.addresses = [address];
  }

  return param;
}
