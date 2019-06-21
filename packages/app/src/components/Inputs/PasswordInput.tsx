import React, { useState } from 'react';
import { PixelRatio, Platform, TouchableWithoutFeedback } from 'react-native';
import { Icon, Input, InputProps } from 'react-native-elements';

interface Props extends InputProps {
  allowPeeking?: boolean;
}

export const PasswordInput = ({ allowPeeking = true, ...props }: Props) => {
  const [isPeeking, setPeeking] = useState(false);
  let PeekIcon;
  if (allowPeeking && !!props.value) {
    PeekIcon = (
      <Icon
        name={isPeeking ? 'eye' : 'eye-off'}
        type={'feather'}
        onPress={() => {
          setPeeking(!isPeeking);
        }}
        size={18 * PixelRatio.getFontScale()}
        Component={TouchableWithoutFeedback}
      />
    );
  }
  return (
    <Input
      placeholder="Password"
      keyboardType={Platform.OS === 'android' ? 'visible-password' : undefined}
      secureTextEntry={!isPeeking}
      textContentType="password"
      rightIcon={PeekIcon}
      {...props}
    />
  );
};
