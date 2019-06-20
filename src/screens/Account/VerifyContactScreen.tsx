import { Formik, FormikActions } from 'formik';
import React, { useEffect, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import {
  VerifyContactModel,
  VerifyContactSchema,
  handleVerifyContact,
  handleVerifyContactResend,
} from '../../stores';
import {
  CodeInput,
  FormikInputInjector,
  MemoFormikFormErrorText,
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../components';
import { Busy, NavigationService, alertFail, alertOk } from '../../utils';

interface VerifyContactScreenProps extends NavigationScreenProps {}
type FormModel = typeof VerifyContactModel;

const onSubmit = async (
  values: FormModel,
  actions: FormikActions<FormModel>,
) => {
  try {
    await handleVerifyContact(values);
    alertOk(() => NavigationService.navigate('Profile'));
  } catch (err) {
    actions.setFieldError('form', err.message);
    alertFail(() => null, err);
  } finally {
    actions.setSubmitting(false);
  }
};

const handlePressVerifyContactResend = async (contact: CognitoContact) => {
  try {
    Busy.start();
    await handleVerifyContactResend(contact);
    alertOk(() => null);
  } catch (err) {
    alertFail(() => null, err);
  } finally {
    Busy.stop();
  }
};

export const VerifyContactScreen = (props: VerifyContactScreenProps) => {
  const [contact, setContact] = useState<CognitoContact | null>(null);
  const [contactValue, setContactValue] = useState<string | null>(null);

  useEffect(() => {
    const { navigation } = props;
    if (!contact || !contactValue) {
      setContact(navigation.getParam('contact'));
      setContactValue(navigation.getParam('contactValue'));
    }
  });

  if (!contactValue || !contact) {
    return null;
  }

  const showVerifyEmail = contact === 'email';
  const showVerifyPhone = contact === 'phone_number';

  return (
    <StyledScreenContainer>
      <Formik<FormModel>
        enableReinitialize
        initialValues={{
          ...VerifyContactModel,
          contact,
          [contact as string]: contactValue,
        }}
        validationSchema={VerifyContactSchema}
        onSubmit={(values, actions) => {
          onSubmit(values, actions);
        }}
      >
        {fProps => {
          return (
            <StyledFormContainer>
              <StyledFormRow>
                <FormikInputInjector
                  dataKey={contact as string}
                  formProps={fProps}
                >
                  <StyledTextInput
                    inputComponent={
                      // NOTE: avoid nasty forwardReft runtime exception, use class
                      class extends React.Component<TextInputProps> {
                        public render() {
                          return <TextInput {...this.props} editable={false} />;
                        }
                      }
                    }
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="code" formProps={fProps}>
                  <StyledTextInput as={CodeInput} />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <MemoFormikFormErrorText {...fProps} />
              </StyledFormRow>

              <StyledFormRow>
                <StyledButton onPress={fProps.handleSubmit} label={'Submit'} />
              </StyledFormRow>

              {showVerifyEmail && (
                <StyledButton
                  label="Request email code"
                  onPress={() => handlePressVerifyContactResend('email')}
                  type="clear"
                />
              )}
              {showVerifyPhone && (
                <StyledButton
                  label="Request phone code"
                  onPress={() => handlePressVerifyContactResend('phone_number')}
                  type="clear"
                />
              )}
            </StyledFormContainer>
          );
        }}
      </Formik>
    </StyledScreenContainer>
  );
};
