import { StatusBar } from 'react-native';

import { isLight } from './colorUtils';

export const updateStatusBarStyle = (color?: string) => {
  if (color) {
    const statusBarStyle = isLight(color) ? 'dark-content' : 'light-content';
    StatusBar.setBarStyle(statusBarStyle);
  } else {
    StatusBar.setBarStyle('default');
  }
};
