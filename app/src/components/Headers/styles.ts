import { StyleSheet } from 'react-native';

import { StyleGuide } from '../../themes';

export const styles = StyleSheet.create({
  headerText: {
    paddingVertical: StyleGuide.gap.regular,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: StyleGuide.gap.big,
    marginHorizontal: StyleGuide.gap.big,
  },
});
