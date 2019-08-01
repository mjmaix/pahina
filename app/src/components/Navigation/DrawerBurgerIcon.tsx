import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';
import { HeaderIcon, IconCollection } from '../Icons';
import { NavigationService } from '../../utils';

export const DrawerBurgerIcon = ({ screenProps }: NavigationScreenProps) => {
  const { theme } = screenProps as ThemedComponentProps;
  return (
    <HeaderIcon
      icon={{
        ...IconCollection.burger,
        iconStyle: { color: theme.colors.primary },
      }}
      onPress={() => NavigationService.toggleDrawer()}
    />
  );
};
