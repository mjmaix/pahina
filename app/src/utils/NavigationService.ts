import {
  NavigationActions,
  NavigationContainerComponent,
  DrawerActions,
} from 'react-navigation';
import { ScreenName } from '../screens/routes/mappings';

let navigator: NavigationContainerComponent;

function setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
  navigator = navigatorRef;
}

function navigate(routeName: ScreenName, params?: any) {
  if (navigator) {
    navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  }
}

function goBack() {
  if (navigator) {
    navigator.dispatch(NavigationActions.back());
  }
}

function toggleDrawer() {
  if (navigator) {
    navigator.dispatch(DrawerActions.toggleDrawer());
  }
}

export const NavigationService = {
  goBack,
  navigate,
  setTopLevelNavigator,
  toggleDrawer,
};
