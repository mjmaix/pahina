import React from 'react';
import { Alert } from 'react-native';
import { AppSyncUser } from '../../shared';

export type UserStoreData = AppSyncUser;

export interface UserStoreInfo {
  data: UserStoreData | null;
  isReady?: boolean;
  update?: (k: UserStoreData) => void;
}

export const UserContext = React.createContext<UserStoreInfo>({
  data: null,
  isReady: false,
  update: d => Alert.alert('not yet implemented'),
});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
