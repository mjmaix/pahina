import React from 'react';
import { StackNavigatorConfig, createStackNavigator } from 'react-navigation';

import { FixedBackHeader } from '../../components';
import { Mappings, StackRouteConfigMap } from '../mappings';

const options: StackNavigatorConfig = {
  headerMode: 'screen',
  mode: 'modal',
  initialRouteName: 'SignInChoices',
};

const routeConfigMap: StackRouteConfigMap = {
  SignInChoices: {
    screen: Mappings.SignInChoices.screen,
    navigationOptions: {
      header: null,
    },
  },
  SignInEmail: {
    screen: Mappings.SignInEmail.screen,
    navigationOptions: {
      header: (
        <FixedBackHeader
          backTo="SignInChoices"
          iconProps={{ name: 'close', type: 'antdesign' }}
        />
      ),
    },
  },
  SignInPhoneNumber: {
    screen: Mappings.SignInPhoneNumber.screen,
    navigationOptions: {
      header: (
        <FixedBackHeader
          backTo="SignInChoices"
          iconProps={{ name: 'close', type: 'antdesign' }}
        />
      ),
    },
  },
  SignUp: {
    screen: Mappings.SignUp.screen,
    navigationOptions: {
      header: (
        <FixedBackHeader
          backTo="SignInChoices"
          iconProps={{ name: 'close', type: 'antdesign' }}
        />
      ),
    },
  },
  SignInCode: {
    screen: Mappings.SignInCode.screen,
    navigationOptions: {
      header: (
        <FixedBackHeader
          backTo="SignInChoices"
          iconProps={{ name: 'close', type: 'antdesign' }}
        />
      ),
    },
  },
  Forgot: {
    screen: Mappings.Forgot.screen,
    navigationOptions: {
      header: (
        <FixedBackHeader
          backTo="SignInChoices"
          iconProps={{ name: 'close', type: 'antdesign' }}
        />
      ),
    },
  },
  Resend: {
    screen: Mappings.Resend.screen,
    navigationOptions: {
      header: (
        <FixedBackHeader
          backTo="SignInChoices"
          iconProps={{ name: 'close', type: 'antdesign' }}
        />
      ),
    },
  },
  CompleteRegistration: {
    screen: Mappings.CompleteRegistration.screen,
    navigationOptions: {
      header: (
        <FixedBackHeader
          backTo="SignInChoices"
          iconProps={{ name: 'close', type: 'antdesign' }}
        />
      ),
    },
  },
  Confirm: {
    screen: Mappings.Confirm.screen,
    navigationOptions: {
      header: (
        <FixedBackHeader
          backTo="SignInChoices"
          iconProps={{ name: 'close', type: 'antdesign' }}
        />
      ),
    },
  },
  Reset: {
    screen: Mappings.Reset.screen,
    navigationOptions: {
      header: (
        <FixedBackHeader
          backTo="SignInChoices"
          iconProps={{ name: 'close', type: 'antdesign' }}
        />
      ),
    },
  },
};

const AuthStack = createStackNavigator(routeConfigMap, options);

export default AuthStack;
