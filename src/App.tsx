import React, { Component } from 'react';
import { Hub } from '@aws-amplify/core';
import Cache from '@aws-amplify/cache';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {
  ThemeProvider as RneThemeProvider,
  Theme,
} from 'react-native-elements';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import { ThemeHelper } from './core/themes/ThemeHelper';
import { logError, logInfo } from './utils/reports';
import { HubCallback } from '@aws-amplify/core/lib/Hub';
import { STORAGE_KEY, ThemeName } from './core/themes';

interface AppState {
  theme?: Theme;
  isThemeReady: boolean;
}

const initialState = {
  theme: ThemeHelper.get(),
  isThemeReady: false,
};

export default class App extends Component<{}, AppState> {
  public readonly state = initialState;

  public componentWillMount() {
    ThemeHelper.addListener(theme => this.setState({ theme }));
  }

  public async componentDidMount() {
    this.loadTheme();
    Hub.listen('auth', this.authListener);
  }

  public authListener: HubCallback = data => {
    logInfo('[START] authListener');
    switch (data.payload.event) {
      case 'signIn':
        break;
      case 'signOut':
        break;
    }
  };

  public componentWillUnmount() {
    ThemeHelper.removeAllListeners();
  }

  public render() {
    const { isThemeReady } = this.state;
    if (!isThemeReady) {
      return <ActivityIndicator />;
    }
    const { theme } = this.state;

    return (
      <ScThemeProvider theme={theme}>
        <RneThemeProvider theme={theme}>
          <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
          </View>
        </RneThemeProvider>
      </ScThemeProvider>
    );
  }

  private async loadTheme() {
    try {
      const themeId = Cache.getItem(STORAGE_KEY) as ThemeName;
      if (themeId) {
        ThemeHelper.set(themeId);
        this.setState({ isThemeReady: true, theme: ThemeHelper.get() });
      }
    } catch (err) {
      logError(err);
    } finally {
      this.setState({ isThemeReady: true });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
