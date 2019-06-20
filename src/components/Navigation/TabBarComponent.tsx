import React, { Component } from 'react';
import { View, LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { BottomTabBar, BottomTabBarProps } from 'react-navigation';

interface State {
  layout: LayoutRectangle;
}

const initialValue = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const TabBarContext = React.createContext<LayoutRectangle>(initialValue);
export const TabBarProvider = TabBarContext.Provider;
export const TabBarConsumer = TabBarContext.Consumer;

class TabBarComponent extends Component<BottomTabBarProps, State> {
  public readonly state = {
    layout: initialValue,
  };
  private setTabMeasurement = (event: LayoutChangeEvent) => {
    const {
      nativeEvent: { layout },
    } = event;
    this.setState({
      layout,
    });
  };

  public render() {
    return (
      <TabBarProvider value={this.state.layout}>
        <View onLayout={this.setTabMeasurement}>
          <BottomTabBar {...this.props} />
        </View>
      </TabBarProvider>
    );
  }
}

export { TabBarComponent };
