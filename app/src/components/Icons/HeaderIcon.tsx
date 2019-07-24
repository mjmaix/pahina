import React from 'react';
import { Icon, IconProps, IconObject } from 'react-native-elements';
import { StyleGuide } from '../../themes';

interface HeaderIconProps {
  icon?: IconObject & IconProps;
  onPress?: () => void;
}

export const HeaderIcon = ({
  icon = { type: 'antdesign', name: 'setting' },
  onPress,
}: HeaderIconProps) => {
  return (
    <Icon
      {...icon}
      onPress={onPress}
      containerStyle={{
        padding: StyleGuide.gap.big,
      }}
    />
  );
};
