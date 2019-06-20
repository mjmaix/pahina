import React from 'react';
import { TextProps, View } from 'react-native';
import { Text } from 'react-native-elements';
import { styles } from './styles';

export interface HeaderTextProps extends TextProps {
  text: string;
}

export const HeaderText = ({ text, ...textProps }: HeaderTextProps) => {
  return (
    <View style={styles.headerText}>
      <Text h4 {...textProps}>
        {text}
      </Text>
    </View>
  );
};
