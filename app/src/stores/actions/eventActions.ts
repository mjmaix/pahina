import {
  CognitoContact,
  handleGetCurrentUserAttrs,
  logInfo,
  handleGetCurrentUser,
  handleGetCurrentIdentityId,
  handleUpdateAppSyncUser,
} from '../../shared';
import { NavigationService } from '../../utils';

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
