import React from 'react';
import { NavigationScreenProps, createStackNavigator } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';

import { StackRouteConfigMap, Mappings } from '../mappings';
import { updateStatusBarStyle } from '../../../utils/StatusBarService';
import { HeaderIcon } from '../../../components';
import { NavigationService } from '../../../utils';

const routeConfigMap: StackRouteConfigMap = {
  Decisions: {
    screen: Mappings.Decisions.screen,

    navigationOptions: ({ screenProps }: NavigationScreenProps) => {
      const { theme } = screenProps as ThemedComponentProps;
      return {
        title: 'Decisions',
        headerLeft: (
          <HeaderIcon
            icon={{
              ...Mappings.Drawer.icon,
              iconStyle: { color: theme.colors.primary },
            }}
            onPress={() => NavigationService.toggleDrawer()}
          />
        ),
      };
    },
  },
  Pledge: {
    screen: Mappings.Pledge.screen,
    navigationOptions: ({ screenProps }: NavigationScreenProps) => {
      return {
        title: 'Pledge',
      };
    },
  },
};

const DecisionStack = createStackNavigator(routeConfigMap, {
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

DecisionStack.navigationOptions = ({ navigation }: NavigationScreenProps) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default DecisionStack;
