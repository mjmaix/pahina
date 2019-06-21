import { FormikProps } from 'formik';
import React from 'react';

import { withFormikImage } from '../HOCs';
import { PreviewAvatar } from './PreviewAvatar';

interface FormikProfileAvatarProps<T extends StringKeyedObject> {
  fProps: FormikProps<T>;
  dataKey: string;
  avatar?: string | null | undefined;
}

export function FormikPreviewAvatar<T extends StringKeyedObject>(
  props: FormikProfileAvatarProps<T>,
) {
  const pictureConfig = {
    dataKey: props.dataKey,
    formProps: props.fProps,
  };
  const FormikImageWrapper = withFormikImage<T>(PreviewAvatar, pictureConfig);

  return <FormikImageWrapper />;
}
