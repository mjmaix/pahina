import React from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { StackRouteConfigMap, Mappings } from '../mappings';
import {
  commonNavigationOption,
  commonCreateStackNavigator,
} from '../stackUtils';
import { DrawerBurgerIcon } from '../../../components';

const routeConfigMap: StackRouteConfigMap = {
  Decisions: {
    screen: Mappings.Decisions.screen,

    navigationOptions: (navScreenProps: NavigationScreenProps) => {
      return {
        title: 'Decisions',
        headerLeft: <DrawerBurgerIcon {...navScreenProps} />,
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

const DecisionStack = commonCreateStackNavigator(routeConfigMap);

DecisionStack.navigationOptions = commonNavigationOption();

export default DecisionStack;
