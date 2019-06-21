import { CurrentUserOpts } from '@aws-amplify/auth/lib/types';

import { isConnected } from '../utils/networkUtil';

export const asyncGetCurrentUserOpts = () =>
  isConnected().then(conFlag => ({ bypassCache: conFlag }));

export const buildOpts = async (opts?: CurrentUserOpts) => {
  const netOpts = await asyncGetCurrentUserOpts();
  const builtOpts = {
    ...netOpts,
    ...opts,
  };
  return builtOpts;
};

export const generateTotpLink = (
  user: string,
  secret: string,
  issuer: string,
) => {
  return `otpauth://totp/AWSCognito:${user}?secret=${secret}&issuer=${issuer}`;
};
