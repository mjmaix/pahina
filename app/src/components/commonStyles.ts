import { StyleSheet, TextStyle } from 'react-native';

import { StyleGuide } from '../themes';

export const formStyles = StyleSheet.create({
  form: {
    alignSelf: 'center',
    width: '90%',
  },
  formItem: {
    paddingBottom: StyleGuide.gap.regular,
  },
  formItemImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const containerStyles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  fullCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedTop: {
    position: 'absolute',
    top: 0,
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
  },
  transparent: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  white: {
    backgroundColor: 'white',
  },
  screenPad: {
    padding: StyleGuide.gap.big,
  },
  darken: { backgroundColor: 'rgba(0,0,0,0.1)' },
});

export const otherStyles = {
  noHeight: {
    height: 0,
  },
};
