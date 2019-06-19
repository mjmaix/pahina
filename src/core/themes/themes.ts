import { Color } from 'csstype';
import {
  Colors as RneColors,
  Theme as RneTheme,
  colors,
} from 'react-native-elements';

export const DEFAULT_THEME: ThemeName = 'LIGHT BRILLIANT PINK';

export interface Theme extends RneTheme {
  id: ThemeName;
  colors: {
    bgColor: Color;
    primary: Color;
    primarytext: Color;
    primarylight: Color;
    primarylighttext: Color;
    primarydark: Color;
    primarydarktext: Color;
    secondary: Color;
    secondarytext: Color;
    secondarylight: Color;
    secondarylighttext: Color;
    secondarydark: Color;
    secondarydarktext: Color;
  } & Partial<RneColors>;
  activeTintColor: Color;
  inactiveTintColor: Color;
  // statusBarStyle: StatusBarStyle;
}

export type ThemeName =
  | 'LIGHT BRILLIANT PINK'
  | 'PINK'
  | 'CYAN BLUE'
  | 'MEDIUM AQUAMARINE'
  | 'MISTY ROSE'
  | 'GOLD';

export const themes: Theme[] = [
  // {
  //   id: 'DEFAULT',
  //   colors: {
  //     ...Platform.select({
  //       default: colors.platform.android,
  //       ios: colors.platform.ios,
  //     }),
  //     bgColor: 'white',
  //   },
  //   activeTintColor: colors.primary,
  //   inactiveTintColor: colors.secondary,
  // },
  {
    id: 'LIGHT BRILLIANT PINK',
    colors: {
      ...colors,
      bgColor: 'white',
      primary: '#ec407a',
      primarytext: 'white',
      primarylight: '#ff77a9',
      primarylighttext: 'black',
      primarydark: '#b4004e',
      primarydarktext: 'white',
      secondary: '#455a64',
      secondarytext: 'white',
      secondarylight: '#718792',
      secondarylighttext: 'black',
      secondarydark: '#1c313a',
      secondarydarktext: 'white',
    },
    activeTintColor: '#ec407a',
    inactiveTintColor: '#455a64',
  },
  {
    id: 'CYAN BLUE',
    colors: {
      ...colors,
      bgColor: 'white',
      primary: '#01579b',
      primarytext: 'white',
      primarylight: '#4f83cc',
      primarylighttext: 'black',
      primarydark: '#002f6c',
      primarydarktext: 'white',
      secondary: '#b0bec5',
      secondarytext: 'black',
      secondarylight: '#e2f1f8',
      secondarylighttext: 'black',
      secondarydark: '#1c313a',
      secondarydarktext: 'black',
    },
    activeTintColor: '#ec407a',
    inactiveTintColor: '#455a64',
  },
  // {
  //   id: 'MISTY ROSE',
  //   colors: {
  //     bgColor: 'slateblue',
  //     primary: 'mistyrose',
  //     secondary: 'black',
  //   },
  //   activeTintColor: colors.primary,
  //   inactiveTintColor: colors.secondary,
  // },
  // {
  //   id: 'GOLD',
  //   colors: {
  //     bgColor: 'ghostwhite',
  //     primary: 'gold',
  //     secondary: 'black',
  //   },
  //   activeTintColor: colors.primary,
  //   inactiveTintColor: colors.secondary,
  // },
];
