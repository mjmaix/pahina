import { Intersection } from 'utility-types/dist/mapped-types';

/* eslint-disable no-use-before-define */
type Fields =
  | 'email'
  | 'family_name'
  | 'given_name'
  | 'phone_number'
  | 'picture'
  | 'code'
  | 'password'
  | 'password_old'
  | 'contact';

type FormModel = { [k in Fields]?: string };

export type ProfileModel = Intersection<typeof ProfileModel, FormModel>;
export type EmailModel = Intersection<typeof EmailModel, FormModel>;
export type PhoneNumberModel = Intersection<typeof PhoneNumberModel, FormModel>;
export type CodeRequiredModel = Intersection<
  typeof CodeRequiredModel,
  FormModel
>;
export type ChallengeModel = Intersection<typeof ChallengeModel, FormModel>;
export type PasswordRequiredModel = Intersection<
  typeof PasswordRequiredModel,
  FormModel
>;
export type PasswordResetModel = Intersection<
  typeof PasswordResetModel,
  FormModel
>;
export type PasswordChangeModel = Intersection<
  typeof PasswordChangeModel,
  FormModel
>;
export type SignUpModel = Intersection<typeof SignUpModel, FormModel>;
export type SignInModel = Intersection<typeof SignInModel, FormModel>;
export type VerifyContactModel = Intersection<
  typeof VerifyContactModel,
  FormModel
>;

export const ProfileModel = {
  email: '',
  family_name: '',
  given_name: '',
  phone_number: '',
  picture: '',
};

export const EmailModel = {
  email: '',
};

export const PhoneNumberModel = {
  phone_number: '',
};

export const CodeRequiredModel = {
  code: '',
};

export const ChallengeModel = {
  ...CodeRequiredModel,
  ...EmailModel,
};

export const PasswordRequiredModel = {
  password: '',
};

export const PasswordResetModel = {
  ...PasswordRequiredModel,
  ...CodeRequiredModel,
  ...EmailModel,
};

export const PasswordChangeModel = {
  ...PasswordRequiredModel,
  password_old: '',
};

export const SignUpModel = {
  ...ProfileModel,
  ...PasswordRequiredModel,
};

export const SignInModel = {
  ...EmailModel,
  ...PhoneNumberModel,
  ...PasswordRequiredModel,
};

export const VerifyContactModel = {
  ...EmailModel,
  ...CodeRequiredModel,
  contact: '',
  phone_number: '',
};

export const AddressModel = {
  id: '',
  address1: '',
  address2: '',
  city: '',
  first_name: '',
  last_name: '',
  phone: '',
  province: '',
  country: '',
  zip: '',
  default: false,
};
