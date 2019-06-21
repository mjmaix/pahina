import { FormikErrors, FormikProps } from 'formik';
import React from 'react';

import { StyledErrorText } from '../Styled/StyledErrorComponents';
import { withFormikMemoize } from './withFormikMemoize';

interface FormError<T> extends FormikProps<T> {
  errors: FormikErrors<T & { form: string }>;
}

function renderErrorText<T>(fProps: FormError<T>) {
  return <StyledErrorText message={fProps.errors.form as string} />;
}

export const MemoFormikFormErrorText = withFormikMemoize(
  renderErrorText,
  'form',
  true,
);
