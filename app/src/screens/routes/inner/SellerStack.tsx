import React from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { StackRouteConfigMap, Mappings } from '../mappings';
import {
  commonCreateStackNavigator,
  commonNavigationOption,
} from '../stackUtils';
import { DrawerBurgerIcon } from '../../../components';

const routeConfigMap: StackRouteConfigMap = {
  BecomeSeller: {
    screen: Mappings.BecomeSeller.screen,

    navigationOptions: (navScreenProps: NavigationScreenProps) => {
      return {
        title: 'Become a seller',
        headerLeft: <DrawerBurgerIcon {...navScreenProps} />,
      };
    },
  },
};

const SellerStack = commonCreateStackNavigator(routeConfigMap);

SellerStack.navigationOptions = commonNavigationOption();

export default SellerStack;
