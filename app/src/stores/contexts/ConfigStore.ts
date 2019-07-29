import React from 'react';
import { Alert } from 'react-native';
import { Config } from '../../shared';

export type ConfigData = Config;

export interface ConfigStoreInfo {
  data?: Config | null;
  isReady?: boolean;
  update?: (k: Config) => void;
}

export const ConfigContext = React.createContext<ConfigStoreInfo>({
  data: null,
  isReady: false,
  update: d => Alert.alert('not yet implemented'),
});

export const ConfigProvider = ConfigContext.Provider;
export const ConfigConsumer = ConfigContext.Consumer;
