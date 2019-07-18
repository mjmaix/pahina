import React from 'react';
import { Alert } from 'react-native';
import { Storefront } from '../../shared';

export type StorefrontData = Storefront;

export interface StorefrontStoreInfo {
  data?: Storefront | null;
  isReady?: boolean;
  update?: (k: Storefront) => void;
}

export const StorefrontContext = React.createContext<StorefrontStoreInfo>({
  data: null,
  isReady: false,
  update: d => Alert.alert('not yet implemented'),
});

export const StorefrontProvider = StorefrontContext.Provider;
export const StorefrontConsumer = StorefrontContext.Consumer;
