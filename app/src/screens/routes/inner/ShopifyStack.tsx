import React from 'react';
import { NavigationScreenProps, createStackNavigator } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';

import { Mappings, StackRouteConfigMap } from '../mappings';
import { updateStatusBarStyle } from '../../../utils/StatusBarService';
import { commonNavigationOption } from '../stackUtils';
import { DrawerBurgerIcon } from '../../../components';

const routeConfigMap: StackRouteConfigMap = {
  Shop: {
    screen: Mappings.Shop.screen,
    navigationOptions: ({ screenProps }: NavigationScreenProps) => {
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
  defaultNavigationOptions: (navScreenProps: NavigationScreenProps) => {
    const { screenProps, navigation } = navScreenProps;
    const { theme } = screenProps as ThemedComponentProps;
    navigation.addListener('didFocus', () => {
      updateStatusBarStyle();
    });
    const isInitial = navigation.isFirstRouteInParent();
    return {
      headerTintColor: theme.colors.primary,
      headerLeft: isInitial ? (
        <DrawerBurgerIcon {...navScreenProps} />
      ) : (
        undefined
      ),
    };
  },
});

ShopifyStack.navigationOptions = commonNavigationOption();

export default ShopifyStack;
