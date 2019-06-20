import React from 'react';
import { Text } from 'react-native-elements';

interface ErrorTextFieldProps {
  message?: string;
  style?: any;
}
export const ErrorText = (props: ErrorTextFieldProps) => {
  return (
    <Text numberOfLines={3} lineBreakMode={'tail'} style={props.style}>
      {props.message}
    </Text>
  );
};
