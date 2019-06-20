interface FormModel {
  [k: string]: string;
}

export const ProfileModel: FormModel = {
  email: '',
  family_name: '',
  given_name: '',
  phone_number: '',
  picture: '',
};

export const EmailModel: FormModel = {
  email: '',
};

export const PhoneNumberModel: FormModel = {
  phone_number: '',
};

export const CodeRequiredModel: FormModel = {
  code: '',
};

export const ChallengeModel: FormModel = {
  ...CodeRequiredModel,
  ...EmailModel,
};

export const PasswordRequiredModel: FormModel = {
  password: '',
};

export const PasswordResetModel: FormModel = {
  ...PasswordRequiredModel,
  ...CodeRequiredModel,
  ...EmailModel,
};

export const PasswordChangeModel: FormModel = {
  ...PasswordRequiredModel,
  oldPassword: '',
};

export const SignUpModel: FormModel = {
  ...ProfileModel,
  ...PasswordRequiredModel,
};

export const SignInModel: FormModel = {
  ...EmailModel,
  ...PhoneNumberModel,
  ...PasswordRequiredModel,
};

export const VerifyContactModel: FormModel = {
  ...EmailModel,
  ...CodeRequiredModel,
  phone_number: '',
};
