import {
  CurrentUserOpts,
  GetPreferredMFAOpts,
} from '@aws-amplify/auth/lib/types';
import { Auth } from 'aws-amplify';
import _ from 'lodash';

import { DeepRequired } from 'utility-types';
import { logInfo } from '../../shared/utils';
import {
  AppCognitoUser,
  CognitoContact,
  MfaOption,
  MfaChallengeType,
  VerifiedContact,
  MfaSignIn,
} from '../types';
import { WrapKnownExceptions } from '../errors';
import {
  SignUpModel,
  SignInModel,
  ProfileModel,
  VerifyContactModel,
  EmailModel,
  ChallengeModel,
  PasswordResetModel,
  PasswordRequiredModel,
  PasswordChangeModel,
  CodeRequiredModel,
} from '../models';

export const handleGetCurrentUserAttrs = async (provOpts?: CurrentUserOpts) => {
  logInfo('[START]', 'handleGetCurrentUserAttrs');
  const currentUser: AppCognitoUser = await Auth.currentUserPoolUser().catch(
    WrapKnownExceptions,
  );
  return currentUser.attributes;
};

export const handleGetCurrentUser = async (provOpts?: CurrentUserOpts) => {
  logInfo('[START]', 'handleGetCurrentUser');
  const currentUser = await Auth.currentUserPoolUser(provOpts).catch(
    WrapKnownExceptions,
  );
  return currentUser as AppCognitoUser;
};

export const handleGetCurrentIdentityId = async () => {
  logInfo('[START]', 'handleGetCurrentIdentityId');
  const creds = await Auth.currentCredentials();
  return creds.identityId;
};

export const handleSignUp = async (data: SignUpModel) => {
  logInfo('[START]', 'handleSignUp');
  const { password, ...attrs } = data;
  const user = await Auth.signUp({
    username: attrs.email,
    password,
    attributes: {
      email: attrs.email,
      family_name: attrs.family_name,
      given_name: attrs.given_name,
      phone_number: attrs.phone_number,
    },
  }).catch(WrapKnownExceptions);

  return user;
};

export const handleSignIn = async (data: SignInModel) => {
  logInfo('[START]', 'handleSignIn');
  const { email, password, phone_number } = data;
  const user = await Auth.signIn({
    username: email.toLowerCase() || phone_number,
    password,
  }).catch(WrapKnownExceptions);
  return user;
};

export const handleSignOut = async (global = false) => {
  logInfo('[START]', 'handleSignOut');
  return Auth.signOut({ global }).catch(WrapKnownExceptions);
};

export const handleUpdateProfile = async (
  data: DeepRequired<typeof ProfileModel>,
) => {
  logInfo('[START]', 'handleUpdateProfile');
  const { email, family_name, given_name, phone_number, picture } = data;
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);

  const buildAttrs: any = {
    email: email.toLowerCase(),
    family_name,
    given_name,
    picture: picture || '', // TODO: workaround, https://github.com/jaredpalmer/formik/pull/728 - wait for formik to support Yup transform during validation
  };

  if (phone_number) {
    buildAttrs.phone_number = phone_number || '';
  }

  const resp = await Auth.updateUserAttributes(user, buildAttrs).catch(
    WrapKnownExceptions,
  );

  return resp;
};

export const handleCheckVerifiedContact = async (
  provOpts?: CurrentUserOpts,
) => {
  logInfo('[START]', 'handleCheckVerifiedContact');
  const user = await Auth.currentUserPoolUser(provOpts).catch(
    WrapKnownExceptions,
  );
  const verif = await Auth.verifiedContact(user).catch(WrapKnownExceptions);
  return verif;
};

export const handleVerifyContact = async (data: VerifyContactModel) => {
  logInfo('[START]', 'handleVerifyContact', data);
  const contact = data.contact as CognitoContact;
  const verif = await Auth.verifyCurrentUserAttributeSubmit(
    contact,
    data.code,
  ).catch(WrapKnownExceptions);

  return verif;
};

export const handleVerifyContactResend = async (contact: CognitoContact) => {
  logInfo('[START]', 'handleVerifyContactResend');
  return Auth.verifyCurrentUserAttribute(contact).catch(WrapKnownExceptions);
};

export const handleResend = async (data: EmailModel) => {
  logInfo('[START]', 'handleResend');
  return Auth.resendSignUp(data.email).catch(WrapKnownExceptions);
};

export const handleConfirmSignUp = async (data: ChallengeModel) => {
  logInfo('[START]', 'handleConfirmSignUp');
  return Auth.confirmSignUp(data.email.toLowerCase(), data.code).catch(
    WrapKnownExceptions,
  );
};

export const handleForgotPassword = async (data: EmailModel) => {
  logInfo('[START]', 'handleForgotPassword');
  return Auth.forgotPassword(data.email).catch(WrapKnownExceptions);
};

export const handleForgotPasswordSubmit = async (data: PasswordResetModel) => {
  logInfo('[START]', 'handleForgotPasswordSubmit');
  await Auth.forgotPasswordSubmit(data.email, data.code, data.password);
  return handleSignOut(true).catch(WrapKnownExceptions);
};

export const handleChangePasswordSubmit = async (data: PasswordChangeModel) => {
  logInfo('[START]', 'handleChangePasswordSubmit');
  const currentUser = await Auth.currentUserPoolUser().catch(
    WrapKnownExceptions,
  );
  return Auth.changePassword(
    currentUser,
    data.password_old,
    data.password,
  ).catch(WrapKnownExceptions);
};

export const handleCompleteNewPassword = async (
  unAuthUser: AppCognitoUser,
  data: SignUpModel & PasswordRequiredModel,
) => {
  logInfo('[START]', 'handleCompleteNewPassword');
  const { requiredAttributes } = unAuthUser.challengeParam;
  const camelCaseData = _.reduce(
    data,
    (acc, v, k) => ({ ...acc, [_.snakeCase(k)]: v }),
    {},
  );
  const valueForReqdAttrs = _.pick(camelCaseData, requiredAttributes);

  return Auth.completeNewPassword(
    unAuthUser,
    data.password,
    valueForReqdAttrs,
  ).catch(WrapKnownExceptions);
};

export const handleSetupMfaTotp = async () => {
  logInfo('[START]', 'handleSetupMfaTotp');
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  return Auth.setupTOTP(user).catch(WrapKnownExceptions);
};

export const handleVerifyMfaTotp = async (data: CodeRequiredModel) => {
  logInfo('[START]', 'handleVerifyMfaTotp');
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  await Auth.verifyTotpToken(user, data.code).catch(WrapKnownExceptions);

  return handleSetMfa('TOTP');
};

export const handleSetupMfaSms = async () => {
  logInfo('[START]', 'handleSetupMfaSms');
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  return Auth.enableSMS(user).catch(WrapKnownExceptions);
};

export const handleVerifyMfaSms = async (data: CodeRequiredModel) => {
  logInfo('[START]', 'handleVerifyMfaSms');
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  await Auth.verifyTotpToken(user, data.code).catch(WrapKnownExceptions);

  return handleSetMfa('SMS');
};

export const handleSetMfa = async (mfa: MfaOption) => {
  logInfo('[START]', 'handleSetMfa');
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  return Auth.setPreferredMFA(user, mfa).catch(WrapKnownExceptions);
};

export const handleGetPreferredMfa = async (opts?: GetPreferredMFAOpts) => {
  logInfo('[START]', 'handleGetPreferredMfa');
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);

  const preferred = await Auth.getPreferredMFA(user, opts).catch(
    WrapKnownExceptions,
  );

  return preferred as MfaChallengeType;
};

export const handleConfirmSignIn = async (
  unAuthUser: AppCognitoUser,
  data: CodeRequiredModel,
) => {
  logInfo('[START]', 'handleConfirmSignIn');
  const mfaType = unAuthUser.challengeName as MfaSignIn;
  return Auth.confirmSignIn(unAuthUser, data.code, mfaType).catch(
    WrapKnownExceptions,
  );
};

export const handleCheckContactVerified = async (
  contact: CognitoContact,
  provOpts?: CurrentUserOpts,
) => {
  logInfo('[START]', 'handleConfirmSignIn');
  const status: VerifiedContact = await handleCheckVerifiedContact(provOpts);
  return !!(status && status.verified && status.verified[contact]);
};
