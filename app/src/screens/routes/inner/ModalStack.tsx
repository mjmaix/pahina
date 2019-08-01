import React from 'react';
import { StackNavigatorConfig, createStackNavigator } from 'react-navigation';

import { Mappings, StackRouteConfigMap } from '../mappings';
import { FixedBackHeader, IconCollection } from '../../../components';

const options: StackNavigatorConfig = {
  headerMode: 'screen',
  mode: 'modal',
  initialRouteName: 'MfaTotp',
};

const routeConfigMap: StackRouteConfigMap = {
  MfaTotp: {
    screen: Mappings.MfaTotp.screen,
    navigationOptions: () => ({
      title: 'Complete TOTP setup',
      header: (
        <FixedBackHeader
          confirm
          iconProps={IconCollection.close}
          backTo="Settings"
        />
      ),
    }),
  },
  MfaSms: {
    screen: Mappings.MfaSms.screen,
    navigationOptions: () => ({
      title: 'Complete SMS setup',
      header: (
        <FixedBackHeader
          confirm
          iconProps={IconCollection.close}
          backTo="Settings"
        />
      ),
    }),
  },
};

const MfaStack = createStackNavigator(routeConfigMap, options);

export default MfaStack;
