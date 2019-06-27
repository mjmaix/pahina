import React from 'react';
import { Input, InputProps } from 'react-native-elements';

export const EmailInput = (props: InputProps) => {
  return (
    <Input
      spellCheck={false}
      placeholder="Email"
      keyboardType="email-address"
      autoCapitalize="none"
      textContentType="emailAddress"
      {...props}
    />
  );
};
