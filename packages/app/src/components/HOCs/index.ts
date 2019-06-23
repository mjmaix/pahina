import { FormikProps } from 'formik';
import { ReactElement } from 'react';
import { ButtonProps, InputProps } from 'react-native-elements';

import { PreviewAvatarProps } from './../Images/PreviewAvatar';
import { StringKeyedObject } from '@pahina/core/types';

export * from './FormikInputInjector';
export * from './FormikButtonInjector';
export * from './withFormikImage';
export * from './withFormikMemoize';
export * from './WithKeyboardHide';
export * from './MemoFormikFormErrorText';

export type SupportedComp =
  | ReactElement<InputProps>
  | ReactElement<ButtonProps>
  | React.ComponentType<PreviewAvatarProps>;

export interface FormikFormWrapperProps<
  T extends StringKeyedObject,
  S extends SupportedComp
> {
  formProps: FormikProps<T>;
  children: S;
}
