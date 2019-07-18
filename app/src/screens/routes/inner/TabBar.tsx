import React from 'react';
import {
  BottomTabNavigatorConfig,
  createBottomTabNavigator,
} from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';

import { Mappings } from '../mappings';
import AccountStack from './AccountStack';
import { IconWithBadge, TabBarComponent } from '../../../components';

const navBarOptions: BottomTabNavigatorConfig = {
  defaultNavigationOptions: ({ navigation, screenProps }) => {
    const { theme } = screenProps as ThemedComponentProps;
    return {
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;

        return (
          <IconWithBadge
            icon={Mappings[routeName].icon}
            color={tintColor || ''}
          />
        );
      },
      tabBarOptions: {
        showLabel: false,
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.secondary,
      },
    };
  },
  tabBarComponent: TabBarComponent,
};

const NavBar = createBottomTabNavigator(
  {
    AccountStack: {
      screen: AccountStack,
    },
  },
  navBarOptions,
);

export default NavBar;
