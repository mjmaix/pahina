import { NavigationScreenProps, createStackNavigator } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';
import { StackRouteConfigMap } from './mappings';
import { updateStatusBarStyle } from '../../utils/StatusBarService';

export const commonCreateStackNavigator = (
  routeConfigMap: StackRouteConfigMap,
) =>
  createStackNavigator(routeConfigMap, {
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

export const commonNavigationOption = () => ({
  navigation,
}: NavigationScreenProps) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
