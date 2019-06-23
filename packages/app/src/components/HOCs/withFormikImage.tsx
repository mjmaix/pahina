import React from 'react';
import { ImageURISource } from 'react-native';
import { AvatarProps, ImageProps } from 'react-native-elements';
import { Subtract } from 'utility-types';
import * as Yup from 'yup';

import { PreviewAvatarProps } from '../';
import { FormikProps } from 'formik';
import { StringKeyedObject } from '@pahina/core/types';

export interface WithFormikConfig<T extends StringKeyedObject> {
  formProps: FormikProps<T>;
  dataKey: string;
}

export interface InjectPreviewAvatarProps extends Partial<AvatarProps> {
  errorMessage?: string | undefined | null;
  handleChangeImage?: ((e: unknown) => void) | null | undefined;
  handleTouched?: (v: boolean) => void;
  isSubmitting?: boolean;
  source?: ImageURISource | undefined;
  imageProps?: Partial<ImageProps>;
  imgKey?: string;
  level?: 'private' | 'protected' | 'public';
}

type ReturnFunc = <
  T extends Subtract<PreviewAvatarProps, InjectPreviewAvatarProps>
>(
  props: T,
) => any;

export function withFormikImage<T extends StringKeyedObject>(
  WrappedComp: React.ComponentType<PreviewAvatarProps>,
  config: WithFormikConfig<T>,
) {
  const { formProps, dataKey } = config;
  const handleChangeImage = formProps.handleChange(dataKey);
  const isSubmitting = formProps.isSubmitting;

  const handleTouched = (v: boolean) => formProps.setFieldTouched(dataKey, v);
  const errorMessage = formProps.errors[dataKey] as string;

  const builtProps: Partial<InjectPreviewAvatarProps> = {
    errorMessage,
    handleChangeImage,
    handleTouched,
    isSubmitting,
    rounded: true,
  };

  const val = formProps.values[dataKey];
  const isUrl = Yup.string()
    .url()
    .required()
    .isValidSync(val);
  const isFilePath = Yup.string()
    .matches(/^(file|content):(\/){1,2}/g)
    .required()
    .isValidSync(val);

  if (isUrl || isFilePath) {
    builtProps.source = { uri: val };
  } else {
    builtProps.imgKey = val;
  }
  return (props => {
    return <WrappedComp {...builtProps} {...props} />;
  }) as ReturnFunc;
}
