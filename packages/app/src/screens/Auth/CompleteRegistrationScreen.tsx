import { Formik, FormikActions } from 'formik';
import includes from 'lodash/includes';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { EmailInput, Header, PasswordInput } from '../../components';
import {
  CompleteRegistrationSchema,
  PasswordRequiredModel,
  SignUpModel,
  handleCompleteNewPassword,
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

type Props = NavigationScreenProps;
interface State {
  user?: AppCognitoUser;
}
type FormModel = Partial<typeof SignUpModel> & typeof PasswordRequiredModel; // NOTE: Partial just to complete blanks

class CompleteRegistrationScreen extends Component<Props, State> {
  public readonly state: State = {
    user: undefined,
  };

  public componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      user: navigation.getParam('unAuthUser'),
    });
  }

  public render() {
    const { user } = this.state;
    if (!user || !user.challengeParam) {
      return null;
    }
    const { challengeParam } = user;
    if (!challengeParam.requiredAttributes) {
      return null;
    }

    const { requiredAttributes } = challengeParam;
    const schema = CompleteRegistrationSchema(requiredAttributes);
    const showEmailField = includes(requiredAttributes, 'email');
    const showPhoneNumberField = includes(requiredAttributes, 'phone_number');
    const showGivenNameField = includes(requiredAttributes, 'given_name');
    const showFamilyNameField = includes(requiredAttributes, 'family_name');
    const showPasswordField = true; // always show

    return (
      <StyledScreenContainer>
        <Header
          title={'Welcome new user.'}
          message="Complete account registration."
        />
        <Formik<FormModel>
          initialValues={SignUpModel}
          validationSchema={schema}
          onSubmit={this.onPressSubmit}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                {showEmailField && (
                  <StyledFormRow>
                    <FormikInputInjector dataKey="email" formProps={fProps}>
                      <StyledTextInput as={EmailInput} />
                    </FormikInputInjector>
                  </StyledFormRow>
                )}

                {showPhoneNumberField && (
                  <StyledFormRow>
                    <FormikInputInjector
                      dataKey="phone_number"
                      formProps={fProps}
                    >
                      <StyledTextInput
                        placeholder="Mobile"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        textContentType="telephoneNumber"
                      />
                    </FormikInputInjector>
                  </StyledFormRow>
                )}

                {showGivenNameField && (
                  <StyledFormRow>
                    <FormikInputInjector
                      dataKey="given_name"
                      formProps={fProps}
                    >
                      <StyledTextInput
                        placeholder="Given name"
                        textContentType="givenName"
                      />
                    </FormikInputInjector>
                  </StyledFormRow>
                )}

                {showFamilyNameField && (
                  <StyledFormRow>
                    <FormikInputInjector
                      dataKey="family_name"
                      formProps={fProps}
                    >
                      <StyledTextInput
                        placeholder="Family name"
                        textContentType="familyName"
                      />
                    </FormikInputInjector>
                  </StyledFormRow>
                )}

                {showPasswordField && (
                  <StyledFormRow>
                    <FormikInputInjector dataKey="password" formProps={fProps}>
                      <StyledTextInput
                        as={PasswordInput}
                        placeholder="New password"
                        onSubmitEditing={fProps.handleSubmit}
                      />
                    </FormikInputInjector>
                  </StyledFormRow>
                )}

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
  private onPressSubmit = async <T extends FormModel>(
    form: T,
    actions: FormikActions<T>,
  ) => {
    const { user } = this.state;

    if (user) {
      try {
        Busy.start();
        await handleCompleteNewPassword(user, form);
        alertOk(() => NavigationService.navigate('App'));
      } catch (err) {
        actions.setFieldError('form', err.message);
        alertFail(() => null, err);
      } finally {
        actions.setSubmitting(false);
        Busy.stop();
      }
    }
  };
}

export { CompleteRegistrationScreen };
