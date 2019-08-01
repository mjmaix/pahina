import React from 'react';
import { IconProps, Icon } from 'react-native-elements';
import { ThemedComponentProps, withTheme } from 'styled-components';

type RNEIconProps = IconProps &
  ThemedComponentProps & {
    primary?: boolean;
    primarytext?: boolean;
    light?: boolean;
    lighttext?: boolean;
    dark?: boolean;
    darktext?: boolean;
  };
const RNEIcon = ({ iconStyle, ...props }: RNEIconProps) => {
  const {
    theme: { colors },
    primary,
    primarytext,
    light,
    lighttext,
    dark,
    darktext,
  } = props;
  let color = colors.primary;
  if (primary) {
    color = colors.primary;
  } else if (primarytext) {
    color = colors.primarylighttext;
  } else if (light) {
    color = colors.primarylight;
  } else if (lighttext) {
    color = colors.primarylighttext;
  } else if (dark) {
    color = colors.primarydark;
  } else if (darktext) {
    color = colors.primarydarktext;
  }
  return <Icon iconStyle={[{ color }, iconStyle]} {...props} />;
};

const ThemedRneIcon = withTheme(RNEIcon);

export { ThemedRneIcon as ThemedIcon };
