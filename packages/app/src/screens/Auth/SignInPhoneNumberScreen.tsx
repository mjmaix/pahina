import { Formik, FormikActions } from 'formik';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { Header, PasswordInput } from '../../components';
import { ScreenName } from '../../routes/mappings';
import {
  FormikInputInjector,
  MemoFormikFormErrorText,
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../components';
import { Busy, NavigationService, alertFail } from '../../utils';
import { MFA_CHALLENGES } from '../../utils/constants';
import { SignInModel, SignInMobileSchema, handleSignIn } from '@pahina/core';

type Props = NavigationScreenProps;
type FormModel = typeof SignInModel;

class SignInPhoneNumberScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <Header title={'Sign in with Mobile'} />
        <Formik
          initialValues={SignInModel}
          validationSchema={SignInMobileSchema}
          onSubmit={this.onPressSignIn}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                <StyledFormRow>
                  <FormikInputInjector
                    dataKey="phone_number"
                    formProps={fProps}
                  >
                    <StyledTextInput
                      placeholder={'Mobile number'}
                      textContentType="telephoneNumber"
                      keyboardType="phone-pad"
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
                    label={'Sign in'}
                  />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }

  private onPressSignIn = async <T extends FormModel>(
    form: T,
    actions: FormikActions<T>,
  ) => {
    let transferScreen: ScreenName | null = 'App';
    let user;
    try {
      Busy.start();
      user = await handleSignIn(form);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        transferScreen = 'CompleteRegistration';
      } else if (MFA_CHALLENGES.includes(user.challengeName)) {
        transferScreen = 'SignInCode';
      }
    } catch (err) {
      transferScreen = null;
      actions.setFieldError('form', err.message);
      alertFail(() => null, err);
    } finally {
      actions.setSubmitting(false);
      Busy.stop();
      if (transferScreen) {
        NavigationService.navigate(transferScreen, {
          unAuthUser: user,
        });
      }
    }
  };
}

export { SignInPhoneNumberScreen };
