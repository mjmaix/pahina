import React from 'react';
import { StackNavigatorConfig, createStackNavigator } from 'react-navigation';

import { Mappings, StackRouteConfigMap } from '../mappings';
import { FixedBackHeader, IconCollection } from '../../../components';

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
          iconProps={IconCollection.close}
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
          iconProps={IconCollection.close}
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
          iconProps={IconCollection.close}
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
          iconProps={IconCollection.close}
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
          iconProps={IconCollection.close}
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
          iconProps={IconCollection.close}
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
          iconProps={IconCollection.close}
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
          iconProps={IconCollection.close}
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
          iconProps={IconCollection.close}
        />
      ),
    },
  },
};

const AuthStack = createStackNavigator(routeConfigMap, options);

export default AuthStack;
