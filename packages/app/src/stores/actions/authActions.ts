import {
  CurrentUserOpts,
  GetPreferredMFAOpts,
} from '@aws-amplify/auth/lib/types';
import { Auth } from 'aws-amplify';
import _ from 'lodash';

import {
  asyncGetCurrentUserOpts,
  buildOpts,
} from '../../utils/amplifyAuthUtils';
import { WrapKnownExceptions } from '../../core/errors';
import {
  ChallengeModel,
  CodeRequiredModel,
  EmailModel,
  PasswordChangeModel,
  PasswordRequiredModel,
  PasswordResetModel,
  ProfileModel,
  SignInModel,
  SignUpModel,
} from '../models';
import { VerifyContactModel } from '../models/index';
import { logInfo } from '../../utils';

type SignUpModel = typeof ProfileModel & typeof PasswordRequiredModel;

export const handleGetCurrentUserAttrs = async (provOpts?: CurrentUserOpts) => {
  logInfo('[START]', 'handleGetCurrentUserAttrs');
  const opts = await buildOpts(provOpts);
  const currentUser: AppCognitoUser = await Auth.currentUserPoolUser(
    opts,
  ).catch(WrapKnownExceptions);
  return currentUser.attributes;
};

export const handleGetCurrentUser = async (provOpts?: CurrentUserOpts) => {
  logInfo('[START]', 'handleGetCurrentUser');
  const opts = await buildOpts(provOpts);
  const currentUser = await Auth.currentUserPoolUser(opts).catch(
    WrapKnownExceptions,
  );
  return currentUser as AppCognitoUser;
};

export const handleGetCurrentIdentityId = async () => {
  logInfo('[START]', 'handleGetCurrentIdentityId');
  const creds = await Auth.currentCredentials();
  return creds.identityId;
};

export const handleSignUp = async (data: typeof SignUpModel) => {
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

export const handleSignIn = async (data: typeof SignInModel) => {
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

export const handleUpdateProfile = async (data: typeof ProfileModel) => {
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
  const opts = await buildOpts(provOpts);
  const user = await Auth.currentUserPoolUser(opts).catch(WrapKnownExceptions);
  const verif = await Auth.verifiedContact(user).catch(WrapKnownExceptions);
  return verif;
};

export const handleVerifyContact = async (data: typeof VerifyContactModel) => {
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

export const handleResend = async (data: typeof EmailModel) => {
  logInfo('[START]', 'handleResend');
  return Auth.resendSignUp(data.email).catch(WrapKnownExceptions);
};

export const handleConfirmSignUp = async (data: typeof ChallengeModel) => {
  logInfo('[START]', 'handleConfirmSignUp');
  return Auth.confirmSignUp(data.email.toLowerCase(), data.code).catch(
    WrapKnownExceptions,
  );
};

export const handleForgotPassword = async (data: typeof EmailModel) => {
  logInfo('[START]', 'handleForgotPassword');
  return Auth.forgotPassword(data.email).catch(WrapKnownExceptions);
};

export const handleForgotPasswordSubmit = async (
  data: typeof PasswordResetModel,
) => {
  logInfo('[START]', 'handleForgotPasswordSubmit');
  await Auth.forgotPasswordSubmit(data.email, data.code, data.password);
  return handleSignOut(true).catch(WrapKnownExceptions);
};

export const handleChangePasswordSubmit = async (
  data: typeof PasswordChangeModel,
) => {
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
  data: Partial<typeof SignUpModel> & typeof PasswordRequiredModel,
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

export const handleVerifyMfaTotp = async (data: typeof CodeRequiredModel) => {
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

export const handleVerifyMfaSms = async (data: typeof CodeRequiredModel) => {
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
  data: typeof CodeRequiredModel,
) => {
  logInfo('[START]', 'handleConfirmSignIn');
  const mfaType = unAuthUser.challengeName as MfaSignIn;
  return Auth.confirmSignIn(unAuthUser, data.code, mfaType).catch(
    WrapKnownExceptions,
  );
};

export const handleCheckContactVerified = async (contact: CognitoContact) => {
  logInfo('[START]', 'handleConfirmSignIn');
  const opts = await asyncGetCurrentUserOpts();
  const status: VerifiedContact = await handleCheckVerifiedContact(opts);
  return !!(status && status.verified && status.verified[contact]);
};
