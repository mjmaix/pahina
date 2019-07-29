import './init';
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Hub, Cache } from 'aws-amplify';
import { HubCallback } from '@aws-amplify/core/lib/Hub';
import {
  ThemeProvider as RneThemeProvider,
  Theme,
} from 'react-native-elements';
import {
  ThemeProvider as ScThemeProvider,
  DefaultTheme,
} from 'styled-components';

import { STORAGE_KEY, ThemeName, ThemeHelper } from './themes';
import { NavigationService } from './utils';
import { logInfo, logError, Config } from './shared';
import { handleGetConfig } from './shared/actions/functionActions';
import { ConfigProvider } from './stores/contexts/ConfigStore';
import { AppRoutes } from './screens/routes';

interface AppState {
  theme?: Theme;
  isThemeReady: boolean;
  config?: Config | null;
}

const initialState = {
  theme: ThemeHelper.get(),
  isThemeReady: false,
  config: undefined,
};

export default class App extends Component<{}, AppState> {
  public readonly state: AppState = initialState;

  public componentWillMount() {
    handleGetConfig().then(resp => {
      if (resp) {
        this.setState({ config: resp.getConfig });
      }
    });

    ThemeHelper.addListener(theme => this.setState({ theme }));
  }

  public async componentDidMount() {
    this.loadTheme();
    Hub.listen('auth', this.authListener);
  }

  public authListener: HubCallback = data => {
    logInfo('[START]', 'authListener');
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
    const { isThemeReady, config, theme } = this.state;
    if (!isThemeReady || !theme) {
      return <ActivityIndicator />;
    }

    return (
      <ScThemeProvider theme={(theme as unknown) as DefaultTheme}>
        <RneThemeProvider theme={theme}>
          <ConfigProvider value={{ data: config, isReady: !!config }}>
            <AppRoutes
              screenProps={{
                theme: this.state.theme,
              }}
              ref={navigatorRef => {
                if (navigatorRef) {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }
              }}
            />
          </ConfigProvider>
        </RneThemeProvider>
      </ScThemeProvider>
    );
  }

  private async loadTheme() {
    try {
      const themeId = (await Cache.getItem(STORAGE_KEY)) as ThemeName;
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
