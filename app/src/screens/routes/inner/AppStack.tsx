import { createStackNavigator } from 'react-navigation';

import ModalsStack from './ModalStack';
import Drawer from './Drawer';

const AppStack = createStackNavigator(
  {
    Drawer: { screen: Drawer },
    Modals: { screen: ModalsStack },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);

export default AppStack;
