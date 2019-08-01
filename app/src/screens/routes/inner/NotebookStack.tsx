import React from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { StackRouteConfigMap, Mappings } from '../mappings';
import {
  commonNavigationOption,
  commonCreateStackNavigator,
} from '../stackUtils';
import { DrawerBurgerIcon } from '../../../components';

const routeConfigMap: StackRouteConfigMap = {
  MyNotes: {
    screen: Mappings.MyNotes.screen,

    navigationOptions: (navScreenProps: NavigationScreenProps) => {
      return {
        title: 'My Notes',
        headerLeft: <DrawerBurgerIcon {...navScreenProps} />,
      };
    },
  },
};

const NotebookStack = commonCreateStackNavigator(routeConfigMap);

NotebookStack.navigationOptions = commonNavigationOption();

export default NotebookStack;
