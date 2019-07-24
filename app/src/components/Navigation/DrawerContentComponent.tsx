import React from 'react';
import { ScrollView } from 'react-native';
import { DrawerItems, SafeAreaView, DrawerItemsProps } from 'react-navigation';
import { withTheme, ThemedComponentProps } from 'styled-components';
import { BrandHeader } from '../Brand';

const DrawerContentComponent = (
  props: DrawerItemsProps & ThemedComponentProps,
) => {
  const {
    theme: { colors },
  } = props;
  return (
    <ScrollView alwaysBounceVertical={false}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <BrandHeader />
        <DrawerItems
          activeTintColor={colors.primarylighttext}
          activeBackgroundColor={colors.primarylight}
          {...props}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const ThemedDrawerContentComponent = withTheme(DrawerContentComponent);

export { ThemedDrawerContentComponent as DrawerContentComponent };
