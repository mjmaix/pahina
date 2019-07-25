import React from 'react';
import { IconProps, Icon } from 'react-native-elements';
import { ThemedComponentProps, withTheme } from 'styled-components';

const RNEIcon = ({ iconStyle, ...props }: IconProps & ThemedComponentProps) => {
  const {
    theme: { colors },
  } = props;
  return <Icon iconStyle={[{ color: colors.primary }, iconStyle]} {...props} />;
};

const ThemedRneIcon = withTheme(RNEIcon);

export { ThemedRneIcon as ThemedIcon };
