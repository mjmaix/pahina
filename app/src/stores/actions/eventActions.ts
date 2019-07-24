import {
  CognitoContact,
  handleGetCurrentUserAttrs,
  logInfo,
  handleGetCurrentUser,
  handleGetCurrentIdentityId,
  handleUpdateAppSyncUser,
  handleSignOut,
} from '../../shared';
import { NavigationService, alertOk, alertFail } from '../../utils';

export const handlePressVerifyContact = async (contact: CognitoContact) => {
  logInfo('[START]', 'handlePressVerifyContact');
  const attributes = await handleGetCurrentUserAttrs();
  const contactValue = attributes[contact];
  NavigationService.navigate('VerifyContact', {
    contact,
    contactValue,
  });
};

export const handleAppSyncUserUpdate = async () => {
  logInfo('[START]', 'handleAppSyncUserUpdate');
  const newUser = await handleGetCurrentUser();
  const identityId = await handleGetCurrentIdentityId();
  return handleUpdateAppSyncUser(newUser, identityId);
};

export const handleSignOutAsync = async () => {
  try {
    await handleSignOut();
    alertOk(() => NavigationService.navigate('Auth'));
  } catch (err) {
    alertFail(() => null, err);
  }
};
