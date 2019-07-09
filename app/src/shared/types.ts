import { CognitoUser as AuthCognitoUser } from '@aws-amplify/auth';
import { ModelFromGetQuery, ModelFromListQuery } from './typesGetter';
import {
  GetPahinaNoteQuery,
  GetPahinaUserSortedNotesQuery,
  GetPahinaCaseQuery,
  ListPahinaCasesQuery,
} from './API';

/**
 * AWS Cognito
 */

export interface VerifiedContact {
  verified: { [key in CognitoContact]?: string };
  unverified: { [key in CognitoContact]?: string };
}

export interface AppUserAttributes {
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_number_verified: false;
  sub: string;
  family_name: string;
  given_name: string;
  picture?: string;
  address?: string;
  birthdate?: string;
  gender?: string;
  locale?: string;
  middle_name?: string;
  name?: string;
  nickname?: string;
  preferred_username: string;
  profile?: string;
  timezone?: string;
  updated_at?: string;
  website?: string;
}

export type MfaMethod = 'TOTP' | 'SMS' | 'NOMFA';
export type MfaChallengeType = 'SOFTWARE_TOKEN_MFA' | 'SMS_MFA' | 'NOMFA';
export type MfaOption = 'TOTP' | 'SMS' | 'NOMFA';
export type MfaSignIn = 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA';

export type CognitoChallengeName =
  | MfaOption
  | MfaMethod
  | MfaSignIn
  | 'CUSTOM_CHALLENGE'
  | 'NEW_PASSWORD_REQUIRED'
  | 'MFA_SETUP';

export type CognitoRequiredAttributes =
  | 'email'
  | 'phone_number'
  | 'family_name'
  | 'given_name';

export type CognitoContact = 'email' | 'phone_number';

export type AppChallengeUserAttributes = {
  [key in CognitoRequiredAttributes]?: any
};

export interface ChallengeParam {
  requiredAttributes: CognitoRequiredAttributes[];
  userAttributes: AppChallengeUserAttributes;
  FRIENDLY_DEVICE_NAME?: string;
}

export interface AppCognitoUser extends AuthCognitoUser {
  attributes: AppUserAttributes;
  challengeName: CognitoChallengeName;
  challengeParam: ChallengeParam;
}

/**
 * AppSync
 */

export type AppSyncUser = ModelFromGetQuery<
  GetPahinaUserSortedNotesQuery,
  'getPahinaUser'
>;

export type AppSyncUserNote = NonNullable<
  Exclude<
    NonNullable<
      Exclude<Exclude<AppSyncUser['notes'], null>['items'], [null]>
    >[0],
    [null]
  >
>;

type CaseFromPahinaNote = NonNullable<
  ModelFromGetQuery<GetPahinaNoteQuery, 'getPahinaNote'>['case']
>;

export type PahinaCase =
  | ModelFromGetQuery<GetPahinaCaseQuery, 'getPahinaCase'>
  | ModelFromListQuery<ListPahinaCasesQuery, 'listPahinaCases'>
  | CaseFromPahinaNote;

export type PahinaNote =
  | ModelFromGetQuery<GetPahinaCaseQuery, 'getPahinaCase'>
  | ModelFromListQuery<ListPahinaCasesQuery, 'listPahinaCases'>;

/**
 * Others
 */

export interface StringKeyedObject {
  [key: string]: any;
}
