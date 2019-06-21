import { CognitoUser as AuthCognitoUser } from '@aws-amplify/auth';

import { GetPahinaUserQuery } from '../src/API';

declare global {
  /**
   * AWS Cognito
   */

  interface VerifiedContact {
    verified: { [key in CognitoContact]?: string };
    unverified: { [key in CognitoContact]?: string };
  }

  interface AppUserAttributes {
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

  type MfaMethod = 'TOTP' | 'SMS' | 'NOMFA';
  type MfaChallengeType = 'SOFTWARE_TOKEN_MFA' | 'SMS_MFA' | 'NOMFA';
  type MfaOption = 'TOTP' | 'SMS' | 'NOMFA';
  type MfaSignIn = 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA';

  type CognitoChallengeName =
    | MfaOption
    | MfaMethod
    | MfaSignIn
    | 'CUSTOM_CHALLENGE'
    | 'NEW_PASSWORD_REQUIRED'
    | 'MFA_SETUP';

  type CognitoRequiredAttributes =
    | 'email'
    | 'phone_number'
    | 'family_name'
    | 'given_name';

  type CognitoContact = 'email' | 'phone_number';

  type AppChallengeUserAttributes = {
    [key in CognitoRequiredAttributes]?: any
  };

  interface ChallengeParam {
    requiredAttributes: CognitoRequiredAttributes[];
    userAttributes: AppChallengeUserAttributes;
    FRIENDLY_DEVICE_NAME?: string;
  }

  interface AppCognitoUser extends AuthCognitoUser {
    attributes: AppUserAttributes;
    challengeName: CognitoChallengeName;
    challengeParam: ChallengeParam;
  }

  interface S3Object {
    key: string;
  }

  /**
   * AWS Storage
   */
  interface StorageConfig {
    level: 'private' | 'protected' | 'public';
    contentType?: string;
    progressCallback?: (param: { loaded: number; total: number }) => void;
    identityId?: string;
    track?: boolean;
  }

  /**
   * AppSync
   */

  type AppSyncUser = ModelFromGetQuery<GetPahinaUserQuery, 'getPahinaUser'>;

  /**
   * Others
   */

  export interface StringKeyedObject {
    [key: string]: any;
  }
}
