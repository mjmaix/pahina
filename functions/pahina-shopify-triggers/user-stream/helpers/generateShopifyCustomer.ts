export function generateShopifyCustomer(cognitoUser: CognitoUser) {
  const attrs = cognitoUser.userAttributes;
  const first_name = attrs.given_name.Value;
  const last_name = attrs.family_name.Value;
  const email = attrs.email.Value;
  const phone = attrs.phone ? attrs.phone.Value : undefined;
  const verified_email = cognitoUser.UserStatus === 'CONFIRMED';

  const param = {
    customer: {
      first_name,
      last_name,
      email,
      phone,
      verified_email,
    },
  };
  return param;
}
