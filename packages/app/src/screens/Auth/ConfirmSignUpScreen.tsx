import { Formik, FormikActions } from 'formik';
import React, { useEffect, useState } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { CodeInput, EmailInput, Header } from '../../components';
import {
  FormikInputInjector,
  MemoFormikFormErrorText,
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../components';
import { Busy, NavigationService, alertFail, alertOk } from '../../utils';
import {
  ChallengeModel,
  EmailModel,
  handleResend,
  handleConfirmSignUp,
  ChallengeSchema,
} from '@pahina/core';

interface Props extends NavigationScreenProps {}
type FormModel = typeof ChallengeModel;

const onPressResend = async <T extends typeof EmailModel>(form: T) => {
  try {
    Busy.start();
    await handleResend(form);
    alertOk(() => null);
  } catch (err) {
    alertFail(() => null, err);
  } finally {
    Busy.stop();
  }
};

const onSubmit = async <T extends FormModel>(
  values: T,
  actions: FormikActions<T>,
) => {
  try {
    Busy.start();
    await handleConfirmSignUp(values);
    alertOk(() => NavigationService.navigate('SignInEmail'));
  } catch (err) {
    actions.setFieldError('form', err.message);
    alertFail(() => null, err);
  } finally {
    actions.setSubmitting(false);
    Busy.stop();
  }
};

export const ConfirmSignUpScreen = (props: Props) => {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const { navigation } = props;
    const paramEmail = navigation.getParam('email');
    if (paramEmail) {
      setEmail(paramEmail);
    }
  }, []);
  const emailProvided = email ? false : true;
  return (
    <StyledScreenContainer>
      <Header
        title={'Confirm sign up'}
        message={'Provide the code sent to your email.'}
      />
      <Formik<FormModel>
        enableReinitialize
        initialValues={{ ...ChallengeModel, email }}
        validationSchema={ChallengeSchema}
        onSubmit={(values, actions) => {
          onSubmit(values, actions);
        }}
      >
        {fProps => {
          return (
            <StyledFormContainer>
              <StyledFormRow>
                <FormikInputInjector dataKey="email" formProps={fProps}>
                  <StyledTextInput as={EmailInput} editable={emailProvided} />
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
              <StyledFormRow>
                <StyledButton
                  onPress={() =>
                    onPressResend({
                      email: email || fProps.values.email,
                    })
                  }
                  label={'Resend confirmation code'}
                  type="outline"
                />
              </StyledFormRow>
            </StyledFormContainer>
          );
        }}
      </Formik>
    </StyledScreenContainer>
  );
};
