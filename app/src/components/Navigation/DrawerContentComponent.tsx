import React from 'react';
import { ScrollView } from 'react-native';
import { DrawerItems, SafeAreaView, DrawerItemsProps } from 'react-navigation';
import { withTheme, ThemedComponentProps } from 'styled-components';

const styles = {
  container: {},
};

const DrawerContentComponent = (
  props: DrawerItemsProps & ThemedComponentProps,
) => {
  const { theme } = props;
  return (
    <ScrollView alwaysBounceVertical={false}>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <DrawerItems activeTintColor={theme.colors.primary} {...props} />
      </SafeAreaView>
    </ScrollView>
  );
};

const ThemedDrawerContentComponent = withTheme(DrawerContentComponent);

export { ThemedDrawerContentComponent as DrawerContentComponent };
