import React from 'react';
import { Input, InputProps } from 'react-native-elements';

export const CodeInput = (props: InputProps) => {
  return (
    <Input
      placeholder="Code"
      textContentType="oneTimeCode"
      keyboardType="number-pad"
      {...props}
    />
  );
};
