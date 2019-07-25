import React from 'react';
import { View, Alert } from 'react-native';
import { createDrawerNavigator, DrawerNavigatorConfig } from 'react-navigation';

import AccountStack from './AccountStack';
import ShopifyStack from './ShopifyStack';
import DecisionStack from './DecisionStack';
import { DrawerContentComponent } from '../../../components/';
import { Icon } from 'react-native-elements';
import { Mappings } from '../mappings';
import { IconSize } from '../../../utils';

const navBarOptions: DrawerNavigatorConfig = {
  initialRouteName: 'ShopifyStack',
  contentComponent: DrawerContentComponent,
  defaultNavigationOptions: ({ navigation, screenProps }) => ({
    drawerIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      const icon = Mappings[routeName].icon;
      return <Icon {...icon} size={IconSize.SM} />;
    },
  }),
};

const NavBar = createDrawerNavigator(
  {
    ShopifyStack: {
      screen: ShopifyStack,
      navigationOptions: () => ({
        title: 'Shop for Notes',
      }),
    },
    DecisionsStack: {
      screen: DecisionStack,
      navigationOptions: () => ({
        title: 'Filter by Court Decisions',
      }),
    },
    MyNotes: {
      screen: () => {
        Alert.alert('not yet implemented');
        return <View />;
      },
      navigationOptions: () => ({
        title: 'My Notebook',
      }),
    },
    AccountStack: {
      screen: AccountStack,
      navigationOptions: () => ({
        title: 'Settings',
      }),
    },
  },
  navBarOptions,
);

export default NavBar;
