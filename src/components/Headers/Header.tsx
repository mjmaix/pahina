import React from 'react';
import { TextProps, TextStyle, View } from 'react-native';

import { HeaderSub } from './HeaderSub';
import { HeaderText } from './HeaderText';
import { styles } from './styles';

interface HeaderProps extends TextProps {
  title?: string;
  message?: string;
  headerStyle?: TextStyle;
}

// TODO: create a ThemedHeader
export const Header = ({
  title,
  message,
  headerStyle,
  ...props
}: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      {!!title && <HeaderText text={title} style={headerStyle} />}
      {!!message && <HeaderSub message={message} {...props} />}
    </View>
  );
};
