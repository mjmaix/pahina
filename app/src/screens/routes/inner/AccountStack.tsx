import React from 'react';
import { NavigationScreenProps, createStackNavigator } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';

import { Mappings, StackRouteConfigMap } from '../mappings';
import { HeaderIcon } from '../../../components';
import { NavigationService } from '../../../utils';
import { updateStatusBarStyle } from '../../../utils/StatusBarService';

const routeConfigMap: StackRouteConfigMap = {
  Profile: {
    screen: Mappings.Profile.screen,
    navigationOptions: ({ screenProps }: NavigationScreenProps) => {
      const { theme } = screenProps as ThemedComponentProps;
      return {
        title: 'Profile',
      };
    },
  },
  Settings: {
    screen: Mappings.Settings.screen,
    navigationOptions: () => ({
      title: 'Settings',
    }),
  },
  SelectTheme: {
    screen: Mappings.SelectTheme.screen,
    navigationOptions: () => ({
      title: 'Select theme',
    }),
  },
  Change: {
    screen: Mappings.Change.screen,
    navigationOptions: () => ({
      title: 'Change password',
    }),
  },
  VerifyContact: {
    screen: Mappings.VerifyContact.screen,
    navigationOptions: () => ({
      title: 'Verify',
    }),
  },
  SelectMfa: {
    screen: Mappings.SelectMfa.screen,
    navigationOptions: () => ({
      title: 'Configure MFA',
    }),
  },
  Addresses: {
    screen: Mappings.Addresses.screen,
    navigationOptions: () => ({
      title: 'Address Book',
    }),
  },
  Address: {
    screen: Mappings.Address.screen,
    navigationOptions: () => ({
      title: 'Address',
    }),
  },
};

const AccountStack = createStackNavigator(routeConfigMap, {
  initialRouteName: 'Settings',
  defaultNavigationOptions: ({
    screenProps,
    navigation,
    navigationOptions,
  }: NavigationScreenProps) => {
    const { theme } = screenProps as ThemedComponentProps;
    navigation.addListener('didFocus', () => {
      updateStatusBarStyle();
    });
    const isInitial = navigation.isFirstRouteInParent();
    return {
      headerTintColor: theme.colors.primary,
      headerLeft: navigation.isFirstRouteInParent() ? (
        <HeaderIcon
          icon={{
            ...Mappings.Drawer.icon,
            iconStyle: { color: theme.colors.primary },
          }}
          onPress={() => NavigationService.toggleDrawer()}
        />
      ) : (
        undefined
      ),
      headerRight: isInitial ? (
        <HeaderIcon
          icon={{
            ...Mappings.Settings.icon,
            iconStyle: { color: theme.colors.primary },
          }}
          onPress={() => NavigationService.navigate('Settings')}
        />
      ) : null,
    };
  },
});

AccountStack.navigationOptions = ({ navigation }: NavigationScreenProps) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default AccountStack;
