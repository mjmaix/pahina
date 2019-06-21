import React from 'react';
import { Alert } from 'react-native';

export type ClUserStoreData = AppSyncUser;

export interface ClUserStoreInfo {
  data: ClUserStoreData | null;
  isReady?: boolean;
  update?: (k: ClUserStoreData) => void;
}

export const ClUserContext = React.createContext<ClUserStoreInfo>({
  data: null,
  isReady: false,
  update: d => Alert.alert('not yet implemented'),
});

export const ClUserProvider = ClUserContext.Provider;
export const ClUserConsumer = ClUserContext.Consumer;
