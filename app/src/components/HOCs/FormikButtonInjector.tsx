import _ from 'lodash';
import React, { ReactElement } from 'react';
import * as Animatable from 'react-native-animatable';
import { ButtonProps, Icon } from 'react-native-elements';

import { StyleGuide } from '../../themes';
import { FormikFormWrapperProps } from '.';

const AnimatedLoadingIcon = () => (
  <Animatable.View
    animation="rotate"
    easing="linear"
    iterationCount="infinite"
    style={{
      paddingHorizontal: StyleGuide.gap.regular,
    }}
  >
    <Icon type="feather" name="loader" size={15} color="black" />
  </Animatable.View>
);

export function FormikButtonInjector(
  props: FormikFormWrapperProps<any, ReactElement<ButtonProps>>,
) {
  const { children, formProps } = props;
  const isValid = formProps.isValid;
  const isTouched = !_.isEmpty(formProps.touched);
  const onPress = formProps.handleSubmit;
  const isSubmitting = formProps.isSubmitting;

  return React.cloneElement(children, {
    ...props,
    onPress,
    disabled: !isValid || !isTouched || isSubmitting,
    iconRight: true,
    icon: isSubmitting ? AnimatedLoadingIcon : undefined,
  });
}
