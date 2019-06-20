import React from 'react';
import { TextProps } from 'react-native';
import { Text } from 'react-native-elements';

export interface HeaderSubProps extends TextProps {
  message: string;
}

export const HeaderSub = ({ message, ...props }: HeaderSubProps) => {
  return (
    <Text numberOfLines={3} {...props}>
      {message}
    </Text>
  );
};
