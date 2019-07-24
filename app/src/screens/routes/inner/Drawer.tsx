import React from 'react';
import { View, Alert } from 'react-native';
import { createDrawerNavigator, DrawerNavigatorConfig } from 'react-navigation';

import AccountStack from './AccountStack';
import ShopifyStack from './ShopifyStack';
import DecisionStack from './DecisionStack';
import { DrawerContentComponent } from '../../../components/';

const navBarOptions: DrawerNavigatorConfig = {
  contentComponent: DrawerContentComponent,
};

const NavBar = createDrawerNavigator(
  {
    ShopStack: {
      screen: ShopifyStack,
      navigationOptions: () => ({
        title: 'Browse/Shop for Notes',
      }),
    },
    DecisionsStack: {
      screen: DecisionStack,
      navigationOptions: () => ({
        title: 'Find Notes by Court Decisions',
      }),
    },
    MyNotes: {
      screen: () => {
        Alert.alert('not yet implemented');
        return <View />;
      },
      navigationOptions: () => ({
        title: 'My Notes',
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
