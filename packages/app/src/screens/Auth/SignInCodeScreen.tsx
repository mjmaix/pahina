import { Formik, FormikActions } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { CodeInput, Header } from '../../components';

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
import { AppCognitoUser } from '@pahina/core/types';
import { CodeRequiredModel } from '@pahina/core/src/models';
import { CodeSchema } from '@pahina/core/src/validators';
import { handleConfirmSignIn } from '@pahina/core/src/actions';

type FormModel = typeof CodeRequiredModel;
interface SignInCodeScreenProps extends NavigationScreenProps {}

const onSubmit = async (
  unAuthUser: AppCognitoUser,
  values: FormModel,
  actions: FormikActions<FormModel>,
) => {
  try {
    Busy.start();
    await handleConfirmSignIn(unAuthUser, values);
    alertOk(() => NavigationService.navigate('App'));
  } catch (err) {
    actions.setFieldError('form', err.message);
    alertFail(() => null, err);
  } finally {
    actions.setSubmitting(false);
    Busy.stop();
  }
};

export const SignInCodeScreen = (props: SignInCodeScreenProps) => {
  const [unAuthUser, setUnAuthUser] = useState<AppCognitoUser | null>();

  useEffect(() => {
    const { navigation } = props;
    setUnAuthUser(navigation.getParam('unAuthUser'));
  }, [props.navigation.getParam('unAuthUser')]);

  if (!unAuthUser) {
    return null;
  }

  const showResendSms = unAuthUser.challengeName === 'SMS_MFA';

  return (
    <StyledScreenContainer>
      <Header title={'MFA required'} message="Get the code via SMS/TOTP." />
      <Formik<FormModel>
        initialValues={CodeRequiredModel}
        validationSchema={CodeSchema}
        onSubmit={(values, actions) => {
          if (unAuthUser) {
            onSubmit(unAuthUser, values, actions);
          }
        }}
      >
        {fProps => {
          return (
            <StyledFormContainer>
              <StyledFormRow>
                <FormikInputInjector dataKey="code" formProps={fProps}>
                  <StyledTextInput placeholder="MFA code" as={CodeInput} />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <MemoFormikFormErrorText {...fProps} />
              </StyledFormRow>

              <StyledFormRow>
                <StyledButton onPress={fProps.handleSubmit} label={'Submit'} />
              </StyledFormRow>

              {showResendSms && (
                <StyledFormRow>
                  <StyledButton
                    onPress={() => Alert.alert('not yet implemented')}
                    label={'Resend SMS code'}
                    type="clear"
                  />
                </StyledFormRow>
              )}
            </StyledFormContainer>
          );
        }}
      </Formik>
    </StyledScreenContainer>
  );
};
