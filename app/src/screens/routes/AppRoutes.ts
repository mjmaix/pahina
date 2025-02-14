import {
  StackNavigatorConfig,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import AppStack from './inner/AppStack';
import AuthStack from './inner/AuthStack';
import { Mappings } from './mappings';
import { AuthLoadingScreen } from '..';
import { Transitions } from '../../components/Navigation/Transitions';

const SwitchNav = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const overlayOptions: StackNavigatorConfig = {
  headerMode: 'none',
  mode: 'modal',
  transparentCard: true,
  transitionConfig: Transitions.noAnimation,
};

const OverlayStack = createStackNavigator(
  {
    Main: { screen: SwitchNav },
    Busy: {
      screen: Mappings.Busy.screen,
      navigationOptions: {},
    },
  },
  overlayOptions,
);

export default createAppContainer(OverlayStack);
