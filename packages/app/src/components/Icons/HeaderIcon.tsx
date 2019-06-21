import React from 'react';
import { Icon, IconProps } from 'react-native-elements';
import { IconObject } from '.';
import { StyleGuide } from '../../core';

interface HeaderIconProps {
  icon: IconObject & IconProps;
  onPress?: () => void;
}

export const HeaderIcon = ({ icon, onPress }: HeaderIconProps) => {
  return (
    <Icon
      {...icon}
      onPress={onPress}
      containerStyle={{
        padding: StyleGuide.gap.regular,
      }}
    />
  );
};
