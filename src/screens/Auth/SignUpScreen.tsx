import { Formik, FormikActions } from 'formik';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { EmailInput, Header, PasswordInput } from '../../components';
import { SignUpModel, SignUpSchema, handleSignUp } from '../../core';
import { FormikInputInjector } from '../../hocs';
import { MemoFormikFormErrorText } from '../../hocs/MemoFormikFormErrorText';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
import { Busy, NavigationService, alertFail, alertOk } from '../../utils';

type Props = NavigationScreenProps;
type FormModel = typeof SignUpModel;

class SignUpScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <Header title={'Sign up'} message="Please fill in the details" />
        <Formik<FormModel>
          initialValues={SignUpModel}
          validationSchema={SignUpSchema}
          onSubmit={this.onPressSignUp}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                <StyledFormRow>
                  <FormikInputInjector dataKey="email" formProps={fProps}>
                    <StyledTextInput as={EmailInput} />
                  </FormikInputInjector>
                </StyledFormRow>
                {/* 
                // TODO: the only way to have verified email and phone_number is to validate email first 
                <StyledFormRow>
                  <FormikInputInjector dataKey="phone_number" formProps={fProps}>
                    <StyledTextInput
                      placeholder="Mobile"
                      keyboardType="phone-pad"
                      autoCapitalize="none"
                      textContentType="telephoneNumber"
                    />
                  </FormikInputInjector>
                </StyledFormRow> */}

                <StyledFormRow>
                  <FormikInputInjector dataKey="given_name" formProps={fProps}>
                    <StyledTextInput
                      placeholder="Given name"
                      textContentType="givenName"
                    />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputInjector dataKey="family_name" formProps={fProps}>
                    <StyledTextInput
                      placeholder="Family name"
                      textContentType="familyName"
                    />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputInjector dataKey="password" formProps={fProps}>
                    <StyledTextInput
                      as={PasswordInput}
                      onSubmitEditing={fProps.handleSubmit}
                    />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <MemoFormikFormErrorText {...fProps} />
                </StyledFormRow>

                <StyledFormRow>
                  <StyledButton
                    onPress={fProps.handleSubmit}
                    label={'Sign up'}
                  />
                </StyledFormRow>
                <StyledFormRow>
                  <StyledButton
                    onPress={this.onPressConfirmCode}
                    label={'Confirm code'}
                    type="clear"
                  />
                </StyledFormRow>
                <StyledFormRow>
                  <StyledButton
                    onPress={this.onPressResend}
                    label={'Resend confirm code'}
                    type="clear"
                  />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }

  private onPressSignUp = async <T extends FormModel>(
    form: T,
    actions: FormikActions<T>,
  ) => {
    try {
      Busy.start();
      await handleSignUp(form);
      alertOk(() => {
        actions.resetForm();
        NavigationService.navigate('Confirm', { email: form.email });
      });
    } catch (err) {
      actions.setFieldError('form', err.message);
      alertFail(() => null, err);
    } finally {
      actions.setSubmitting(false);
      Busy.stop();
    }
  };

  private onPressConfirmCode = async () => {
    NavigationService.navigate('Confirm', {
      title: 'Confirmation',
      message: "We've sent a verification code to your email.",
      placeholder: 'Type here',
    });
  };

  private onPressResend = async () => {
    NavigationService.navigate('Resend');
  };
}

export { SignUpScreen };
