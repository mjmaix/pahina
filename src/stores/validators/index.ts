import includes from 'lodash/includes';
import * as Yup from 'yup';

export const emailRule = Yup.string()
  .label('Email')
  .email();

const optionalMobilePattern = /^$|^[=+\s]*(?:[0-9][=+\s]*){8,}$/;
export const phoneNumberRule = Yup.string()
  .label('Mobile number')
  .matches(optionalMobilePattern, 'Not a valid mobile number');

export const passwordRule = Yup.string()
  .matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    'Ensure that password is 8 to 64 characters long and contains a mix of upper and lower case characters, one numeric and one special character',
  )
  .label('Password')
  .min(8);

export const nameRule = Yup.string()
  .label('Name')
  .ensure();

export const pictureRule = Yup.string()
  .label('Profile picture')
  .ensure();

export const codeRule = Yup.string()
  .matches(
    /^[0-9]{6,6}$/,
    'Ensure that code is 6 characters long and only consists of numbers.',
  )
  .label('Code');

export const SignUpSchema = Yup.object().shape({
  password: passwordRule.required(),
  email: emailRule.required(),
  family_name: nameRule.label('Family name').required(),
  given_name: nameRule.label('Given name').required(),
  phone_number: phoneNumberRule.notRequired(),
  picture: pictureRule.notRequired(),
});

export const CompleteNewPasswordSchema = Yup.object().shape({
  password: passwordRule.required(),
  email: emailRule.notRequired(),
  family_name: nameRule.label('Family name').required(),
  given_name: nameRule.label('Given name').required(),
  phone_umber: phoneNumberRule.notRequired(),
});

export const UpdateProfileSchema = Yup.object().shape({
  email: emailRule.required(),
  family_name: nameRule.label('Family name').required(),
  given_name: nameRule.label('Given name').required(),
  phone_umber: phoneNumberRule.notRequired(),
  picture: pictureRule.notRequired(),
});

export const SignInEmailSchema = Yup.object().shape({
  password: Yup.string().required(),
  email: emailRule.required(),
});

export const SignInMobileSchema = Yup.object().shape({
  password: Yup.string().required(),
  phone_umber: phoneNumberRule.required(),
});

export const ChallengeSchema = Yup.object().shape({
  email: emailRule.required(),
  code: codeRule.required('Required'),
});

export const VerifyContactSchema = Yup.object().shape({
  email: emailRule.notRequired(),
  phone_number: phoneNumberRule.notRequired(),
  code: codeRule.required('Required'),
});

export const EmailOnlySchema = Yup.object().shape({
  email: emailRule.required(),
});

export const PasswordResetSchema = Yup.object().shape({
  password: passwordRule.required(),
  code: codeRule.required(),
  email: emailRule.required(),
});

export const PasswordChangeSchema = Yup.object().shape({
  password_old: passwordRule.label('Old password').required(),
  password: passwordRule.label('New password').required(),
});

export const CodeSchema = Yup.object().shape({
  code: codeRule.required(),
});

export const CompleteRegistrationSchema = (
  requiredAttributes: CognitoRequiredAttributes[],
) => {
  const showEmailField = includes(requiredAttributes, 'email');
  const showPhoneNumberField = includes(requiredAttributes, 'phone_number');
  const showGivenNameField = includes(requiredAttributes, 'given_name');
  const showFamilyNameField = includes(requiredAttributes, 'family_name');
  const showPasswordField = true; // always show

  const schemaFields: { [k: string]: Yup.StringSchema } = {};
  if (showEmailField) {
    schemaFields.email = emailRule.required();
  }

  if (showPhoneNumberField) {
    schemaFields.phone_number = phoneNumberRule.required();
  }

  if (showGivenNameField) {
    schemaFields.given_name = nameRule.label('Given name').required();
  }

  if (showFamilyNameField) {
    schemaFields.family_name = nameRule.label('Family name').required();
  }

  if (showPasswordField) {
    schemaFields.password = passwordRule.required();
  }

  const validationSchema = Yup.object().shape(schemaFields);

  return validationSchema;
};
