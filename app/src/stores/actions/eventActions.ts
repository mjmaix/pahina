import {
  CognitoContact,
  handleGetCurrentUserAttrs,
  logInfo,
  handleGetCurrentUser,
  handleGetAppSyncUser,
  handleGetCurrentIdentityId,
  handleCreateAppSyncUser,
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

export const handleAppSyncUserCreate = async () => {
  logInfo('[START]', 'handleAppSyncUserCreate');
  const cognitoUser = await handleGetCurrentUser();
  const username = cognitoUser.getUsername();
  const response = await handleGetAppSyncUser(username);
  const userExists = response && response.getPahinaUser;
  if (!userExists) {
    logInfo('Create ClUser entry');
    const identityId = await handleGetCurrentIdentityId();
    return handleCreateAppSyncUser(cognitoUser, identityId);
  }
};

export const handleAppSyncUserUpdate = async () => {
  logInfo('[START]', 'handleAppSyncUserUpdate');
  const newUser = await handleGetCurrentUser();
  const identityId = await handleGetCurrentIdentityId();
  return handleUpdateAppSyncUser(newUser, identityId);
};