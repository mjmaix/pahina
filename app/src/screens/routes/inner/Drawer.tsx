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
        title: 'Shop',
      }),
    },
    DecisionsStack: {
      screen: DecisionStack,
      navigationOptions: () => ({
        title: 'Court Decisions',
      }),
    },
    AccountStack: {
      screen: AccountStack,
      navigationOptions: () => ({
        title: 'Settings/Account',
      }),
    },
  },
  navBarOptions,
);

export default NavBar;
