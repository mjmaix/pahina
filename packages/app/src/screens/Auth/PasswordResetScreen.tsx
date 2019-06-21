import { Formik, FormikActions, FormikProps } from 'formik';
import React, { Component } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { CodeInput, EmailInput, Header, PasswordInput } from '../../components';
import {
  PasswordResetModel,
  PasswordResetSchema,
  handleForgotPasswordSubmit,
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
import { Busy, NavigationService, alertFail, alertOk } from '../../utils';

type FormModel = typeof PasswordResetModel;
type Props = NavigationScreenProps;
interface State {
  form: FormModel;
  disableEmailField: boolean;
}

class PasswordResetScreen extends Component<Props, State> {
  public readonly state: State = {
    form: PasswordResetModel,
    disableEmailField: false,
  };

  public componentDidMount() {
    const { navigation } = this.props;
    const email = navigation.getParam('email');
    if (!!email) {
      this.setState(prev => ({
        disableEmailField: true,
        form: { ...prev.form, email },
      }));
    }
  }

  private renderEmail = (fProps: FormikProps<FormModel>) => {
    const { disableEmailField } = this.state;

    if (!disableEmailField) {
      return (
        <FormikInputInjector dataKey="email" formProps={fProps}>
          {<StyledTextInput as={EmailInput} />}
        </FormikInputInjector>
      );
    }
    return (
      <StyledTextInput
        inputComponent={
          // NOTE: avoid nasty forwardReft runtime exception, use class
          // tslint:disable-next-line max-classes-per-file
          class extends React.Component<TextInputProps> {
            public render() {
              return <TextInput {...this.props} editable={false} />;
            }
          }
        }
      />
    );
  };

  public render() {
    return (
      <StyledScreenContainer>
        <Header title={'Change password'} message="Type in the reset code" />
        <Formik<FormModel>
          initialValues={this.state.form}
          validationSchema={PasswordResetSchema}
          onSubmit={this.onPressReset}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                <StyledFormRow>{this.renderEmail(fProps)}</StyledFormRow>

                <StyledFormRow>
                  <FormikInputInjector dataKey="code" formProps={fProps}>
                    <StyledTextInput as={CodeInput} />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputInjector dataKey="password" formProps={fProps}>
                    <StyledTextInput
                      placeholder={'New password'}
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
                    label={'Submit'}
                  />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }
  private onPressReset = async <T extends FormModel>(
    form: T,
    actions: FormikActions<T>,
  ) => {
    try {
      Busy.start();
      await handleForgotPasswordSubmit(form);
      alertOk(() => NavigationService.navigate('App'));
    } catch (err) {
      actions.setFieldError('form', err.message);
      alertFail(() => null, err);
    } finally {
      actions.setSubmitting(false);
      Busy.stop();
    }
  };
}

export { PasswordResetScreen };
