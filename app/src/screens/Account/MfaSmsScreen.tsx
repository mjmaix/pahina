import { Formik, FormikActions } from 'formik';
import React, { useEffect } from 'react';

import {
  CodeInput,
  Header,
  FormikInputInjector,
  MemoFormikFormErrorText,
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
  containerStyles,
} from '../../components';
import { Busy, NavigationService, alertFail, alertOk } from '../../utils';
import {
  CodeRequiredModel,
  handleVerifyMfaSms,
  handleSignOut,
  handleSetupMfaSms,
  CodeSchema,
} from '../../shared';

interface MfaSmsProps {}
type FormModel = typeof CodeRequiredModel;

const onPressSubmit = async <T extends FormModel>(
  form: T,
  actions: FormikActions<T>,
) => {
  try {
    Busy.start();
    await handleVerifyMfaSms(form);
    alertOk(
      async () => {
        await handleSignOut();
        NavigationService.navigate('AuthLoading');
      },
      { message: 'Please sign in again' },
    );
  } catch (err) {
    actions.setFieldError('form', err.message);
    alertFail(() => null, err);
  } finally {
    actions.setSubmitting(false);
    Busy.stop();
  }
};

export const MfaSmsScreen = (props: MfaSmsProps) => {
  useEffect(() => {
    handleSetupMfaSms().catch(err => {
      alertFail(() => null, err);
    });
  }, []);

  return (
    <StyledScreenContainer style={containerStyles.white}>
      <Header
        title={'Complete SMS MFA setup'}
        message={`We sent a verification code to your verified mobile number.`}
      />

      <Formik<FormModel>
        enableReinitialize
        initialValues={CodeRequiredModel}
        validationSchema={CodeSchema}
        onSubmit={onPressSubmit}
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
                <StyledButton onPress={fProps.handleSubmit} label={'Verify'} />
              </StyledFormRow>
            </StyledFormContainer>
          );
        }}
      </Formik>
    </StyledScreenContainer>
  );
};
