import { NetInfo } from 'react-native';

export const isConnected = async () => {
  const net = await NetInfo.isConnected.fetch();

  return net;
};
