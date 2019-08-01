import React from 'react';

import { StackRouteConfigMap, Mappings } from '../mappings';
import {
  commonCreateStackNavigator,
  commonNavigationOption,
} from '../stackUtils';
import { FixedBackHeader, DrawerBurgerIcon } from '../../../components';
import { NavigationScreenProps } from 'react-navigation';

const routeConfigMap: StackRouteConfigMap = {
  BecomeSeller: {
    screen: Mappings.BecomeSeller.screen,
    navigationOptions: (navScreenProps: NavigationScreenProps) => {
      return {
        header: (
          <FixedBackHeader
            IconComponent={() => <DrawerBurgerIcon {...navScreenProps} />}
          />
        ),
      };
    },
  },
};

const SellerStack = commonCreateStackNavigator(routeConfigMap);

SellerStack.navigationOptions = commonNavigationOption();

export default SellerStack;
