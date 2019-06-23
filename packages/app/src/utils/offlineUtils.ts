import { CurrentUserOpts } from '@aws-amplify/auth/lib/types';
import { isConnected } from './networkUtils';

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
