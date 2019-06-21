import React, { ReactNode } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { TabBarConsumer } from './TabBarComponent';

export const TabBarAwareScrollView = ({
  children,
  ...props
}: ScrollViewProps & { children: ReactNode }) => {
  return (
    <TabBarConsumer>
      {tabBarLayout => (
        <ScrollView
          {...props}
          contentContainerStyle={{
            paddingBottom: tabBarLayout.height,
          }}
        >
          {children}
        </ScrollView>
      )}
    </TabBarConsumer>
  );
};
