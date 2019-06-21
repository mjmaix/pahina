import { Formik, FormikActions } from 'formik';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { EmailInput, Header, PasswordInput } from '../../components';
import {
  SignInEmailSchema,
  SignInModel,
  handleClUserCreate,
  handleSignIn,
} from '../../stores';
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
import { ScreenName } from '../../routes/mappings';
import { SafeException } from '../../core';

type Props = NavigationScreenProps;
type FormModel = typeof SignInModel;

class SignInEmailScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <Header title={'Sign in with Email'} />
        <Formik
          initialValues={SignInModel}
          validationSchema={SignInEmailSchema}
          onSubmit={this.onPressSignIn}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                <StyledFormRow>
                  <FormikInputInjector dataKey="email" formProps={fProps}>
                    <StyledTextInput as={EmailInput} />
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
      } else if (!user.challengeName) {
        // await handleClUserCreate();
      }
    } catch (err) {
      transferScreen = null;
      if (err.code === 'UserNotConfirmedException') {
        const safeErr: SafeException = err;
        transferScreen = 'Confirm';
        alertFail(() => null, err, {
          title: 'Account not confirmed',
          message: safeErr.message,
        });
      } else {
        actions.setFieldError('form', err.message);
        alertFail(() => null, err);
      }
    } finally {
      actions.setSubmitting(false);
      Busy.stop();
      if (transferScreen) {
        NavigationService.navigate(transferScreen, {
          unAuthUser: user,
          email: form.email,
        });
      }
    }
  };
}

export { SignInEmailScreen };
