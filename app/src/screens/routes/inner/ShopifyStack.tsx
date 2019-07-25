import React from 'react';
import { NavigationScreenProps, createStackNavigator } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';

import { Mappings, StackRouteConfigMap } from '../mappings';
import { HeaderIcon } from '../../../components';
import { NavigationService } from '../../../utils';
import { updateStatusBarStyle } from '../../../utils/StatusBarService';

const routeConfigMap: StackRouteConfigMap = {
  Shop: {
    screen: Mappings.Shop.screen,
    navigationOptions: ({ screenProps }: NavigationScreenProps) => {
      const { theme } = screenProps as ThemedComponentProps;
      return {
        title: 'Shop Notes',
      };
    },
  },
  Cart: {
    screen: Mappings.Cart.screen,
    navigationOptions: () => ({
      title: 'Cart',
    }),
  },
  Product: {
    screen: Mappings.Product.screen,
    navigationOptions: () => ({
      title: 'Product',
    }),
  },
};

const ShopifyStack = createStackNavigator(routeConfigMap, {
  defaultNavigationOptions: ({
    screenProps,
    navigation,
  }: NavigationScreenProps) => {
    const { theme } = screenProps as ThemedComponentProps;
    navigation.addListener('didFocus', () => {
      updateStatusBarStyle();
    });
    const isInitial = navigation.isFirstRouteInParent();
    return {
      headerTintColor: theme.colors.primary,
      headerLeft: isInitial ? (
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
      headerRight: (
        <HeaderIcon
          icon={{
            ...Mappings.Cart.icon,
            iconStyle: { color: theme.colors.primary },
          }}
          onPress={() => NavigationService.navigate('Cart')}
        />
      ),
    };
  },
});

ShopifyStack.navigationOptions = ({ navigation }: NavigationScreenProps) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default ShopifyStack;
