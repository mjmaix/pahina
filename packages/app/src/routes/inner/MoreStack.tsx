import React from 'react';
import { NavigationScreenProps, createStackNavigator } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';

import { HeaderIcon } from '../../components';
import { NavigationService } from '../../utils';
import { updateStatusBarStyle } from '../../utils/StatusBarService';
import { Mappings, StackRouteConfigMap } from '../mappings';

const routeConfigMap: StackRouteConfigMap = {
  Profile: {
    screen: Mappings.Profile.screen,
    navigationOptions: ({ screenProps }: NavigationScreenProps) => {
      const { theme } = screenProps as ThemedComponentProps;
      return {
        title: 'Profile',
        headerRight: (
          <HeaderIcon
            icon={{
              ...Mappings.Settings.icon,
              iconStyle: { color: theme.colors.primary },
            }}
            onPress={() => NavigationService.navigate('Settings')}
          />
        ),
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
};

const MoreStack = createStackNavigator(routeConfigMap, {
  defaultNavigationOptions: ({
    screenProps,
    navigation,
  }: NavigationScreenProps) => {
    const { theme } = screenProps as ThemedComponentProps;
    navigation.addListener('didFocus', () => {
      updateStatusBarStyle();
    });
    return {
      headerTintColor: theme.colors.primary,
    };
  },
});

MoreStack.navigationOptions = ({ navigation }: NavigationScreenProps) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default MoreStack;
