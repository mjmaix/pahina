import React from 'react';

import { NavigationService, alertFail, alertOk } from '../../utils';
import { BaseChallengeScreen } from '../Base/BaseChallengeScreen';
import { handleConfirmSignUp } from '../../shared';

export const NewPasswordScreen = () => {
  return (
    <BaseChallengeScreen
      message={'Provide the code sent to your email.'}
      placeholder={'Code'}
      onSubmit={async (values, actions) => {
        try {
          await handleConfirmSignUp(values);
          alertOk(() => NavigationService.navigate('SignInEmail'));
        } catch (err) {
          actions.setFieldError('form', err.message);
          alertFail(() => null, err);
        } finally {
          actions.setSubmitting(false);
        }
      }}
    />
  );
};
