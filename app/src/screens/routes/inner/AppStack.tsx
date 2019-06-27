import { createStackNavigator } from 'react-navigation';

import ModalsStack from './ModalStack';
import TabBarStack from './TabBar';

const AppStack = createStackNavigator(
  {
    TabBarStack: { screen: TabBarStack },
    Modals: { screen: ModalsStack },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);

export default AppStack;
