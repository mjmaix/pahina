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
import { logInfo, logError, Storefront } from './shared';
import { handleGetStorefrontConfig } from './shared/actions/functionActions';
import { StorefrontProvider } from './stores/contexts/StorefrontStore';
import { AppRoutes } from './screens/routes';

interface AppState {
  theme?: Theme;
  isThemeReady: boolean;
  storefrontConfig?: Storefront | null;
}

const initialState = {
  theme: ThemeHelper.get(),
  isThemeReady: false,
  storefrontConfig: undefined,
};

export default class App extends Component<{}, AppState> {
  public readonly state: AppState = initialState;

  public componentWillMount() {
    handleGetStorefrontConfig().then(resp => {
      if (resp) {
        this.setState({ storefrontConfig: resp.getShopifyStorefrontConfig });
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
    const { isThemeReady, storefrontConfig, theme } = this.state;
    if (!isThemeReady || !theme) {
      return <ActivityIndicator />;
    }

    return (
      <ScThemeProvider theme={(theme as unknown) as DefaultTheme}>
        <RneThemeProvider theme={theme}>
          <StorefrontProvider
            value={{ data: storefrontConfig, isReady: !!storefrontConfig }}
          >
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
          </StorefrontProvider>
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
