import { Formik, FormikActions } from 'formik';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { PasswordInput } from '../../components';
import {
  PasswordChangeModel,
  PasswordChangeSchema,
  handleChangePasswordSubmit,
} from '../../stores';
import { SafeException } from '../../core/errors';
import {
  FormikInputInjector,
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
  MemoFormikFormErrorText,
} from '../../components';

import { NavigationService, alertFail, alertOk } from '../../utils';

type Props = NavigationScreenProps;
type Model = typeof PasswordChangeModel;

class PasswordChangeScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <Formik
          initialValues={PasswordChangeModel}
          validationSchema={PasswordChangeSchema}
          onSubmit={this.onPressChange}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                <StyledFormRow>
                  <FormikInputInjector
                    dataKey="password_old"
                    formProps={fProps}
                  >
                    <StyledTextInput
                      as={PasswordInput}
                      placeholder="Old password"
                    />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputInjector dataKey="password" formProps={fProps}>
                    <StyledTextInput
                      as={PasswordInput}
                      placeholder="New password"
                    />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <MemoFormikFormErrorText {...fProps} />
                </StyledFormRow>

                <StyledFormRow>
                  <StyledButton
                    onPress={fProps.handleSubmit}
                    label={'Change'}
                  />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }
  private onPressChange = async <T extends Model>(
    form: T,
    actions: FormikActions<T>,
  ) => {
    try {
      await handleChangePasswordSubmit(form);
      alertOk(() => NavigationService.navigate('Profile'));
    } catch (err) {
      let formError = err.message;
      const changeError1 =
        err instanceof SafeException && err.code === 'NotAuthorizedException';
      if (changeError1) {
        formError = 'Please provide correct old password.';
      }
      actions.setFieldError('form', formError);
      alertFail(() => null, err);
    }
  };
}

export { PasswordChangeScreen };
