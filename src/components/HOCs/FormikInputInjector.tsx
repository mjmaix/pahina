import _ from 'lodash';
import React, { ReactElement } from 'react';
import { InputProps } from 'react-native-elements';

import { FormikFormWrapperProps, SupportedComp } from '.';

interface FormikFieldWrapperProps<
  T extends StringKeyedObject,
  S extends SupportedComp
> extends FormikFormWrapperProps<T, S> {
  dataKey: string;
}

export function FormikInputInjector<T extends StringKeyedObject>(
  props: FormikFieldWrapperProps<T, ReactElement<InputProps>>,
) {
  const { children, formProps, dataKey, ...props2 } = props;
  // const isValidating = formProps.isValidating;
  // const isDirty = formProps.dirty;
  const isTouched = formProps.touched[dataKey];
  const errorMessage = formProps.errors[dataKey] as string;
  const onChangeText = formProps.handleChange(dataKey);

  let builtProps: Partial<InputProps> = {
    ...props2,
    onChangeText,
    errorMessage: isTouched ? errorMessage : undefined,
  };
  if (formProps.handleBlur(dataKey)) {
    builtProps = {
      ...builtProps,
      onBlur: formProps.handleBlur(dataKey),
    };
  }
  if (formProps.values[dataKey]) {
    builtProps = {
      ...builtProps,
      value: formProps.values[dataKey],
    };
  }
  return React.cloneElement(children, { ...builtProps });
}
