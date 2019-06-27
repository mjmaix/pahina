import React from 'react';
import { NavigationRouteConfig } from 'react-navigation';
import { IconObject, IconProps } from 'react-native-elements';
import {
  ProfileScreen,
  SettingsScreen,
  SelectThemeScreen,
  MfaSelectScreen,
  SignInCodeScreen,
  MfaTotpScreen,
  MfaSmsScreen,
  SignInChoicesScreen,
  SignInEmailScreen,
  SignInPhoneNumberScreen,
  SignUpScreen,
  PasswordForgotScreen,
  ResendSignUpScreen,
  PasswordChangeScreen,
  CompleteRegistrationScreen,
  PasswordResetScreen,
  ConfirmSignUpScreen,
  VerifyContactScreen,
  BusyOverlayScreen,
} from '..';
import { StyleGuide } from '../../themes';

// TODO: rename to RouteName
export type ScreenName =
  | 'Profile'
  | 'Settings'
  | 'SelectTheme'
  | 'SelectMfa'
  | 'SignInCode'
  | 'Mfa'
  | 'MfaTotp'
  | 'MfaSms'
  | 'SignInChoices'
  | 'SignInEmail'
  | 'SignInPhoneNumber'
  | 'SignUp'
  | 'Forgot'
  | 'Resend'
  | 'Change'
  | 'CompleteRegistration'
  | 'Reset'
  | 'Confirm'
  | 'VerifyContact'
  | 'Busy'
  // parents
  | 'AuthLoading'
  | 'App'
  | 'Auth'
  | 'MoreStack'
  | 'MfaStack';

interface Mapping {
  icon: IconObject & IconProps;
  screen: React.ReactNode;
}

type Mappings = { [key in RequiredMapping]: Mapping };
type NoIconNonScreen = 'AuthLoading' | 'App' | 'Auth' | 'MfaStack' | 'Mfa';

export type RequiredMapping = Exclude<ScreenName, NoIconNonScreen>;

export type StackRouteConfigMap = {
  [key in ScreenName]?: NavigationRouteConfig
};

export const Mappings: Mappings = {
  Profile: {
    screen: ProfileScreen,
    icon: StyleGuide.userIcon,
  },
  Settings: {
    screen: SettingsScreen,
    icon: { type: 'antdesign', name: 'setting' },
  },
  SelectTheme: {
    screen: SelectThemeScreen,
    icon: { type: 'antdesign', name: 'bulb1' },
  },
  SelectMfa: {
    screen: MfaSelectScreen,
    icon: { type: 'entypo', name: '' },
  },
  SignInCode: {
    screen: SignInCodeScreen,
    icon: { type: 'entypo', name: '' },
  },
  MfaTotp: {
    screen: MfaTotpScreen,
    icon: { type: 'entypo', name: '' },
  },
  MfaSms: {
    screen: MfaSmsScreen,
    icon: { type: 'entypo', name: 'lock' },
  },
  SignInChoices: {
    screen: SignInChoicesScreen,
    icon: { name: '', type: 'antdesign' },
  },
  SignInEmail: {
    screen: SignInEmailScreen,
    icon: { name: '', type: 'antdesign' },
  },
  SignInPhoneNumber: {
    screen: SignInPhoneNumberScreen,
    icon: { name: '', type: 'antdesign' },
  },
  SignUp: {
    screen: SignUpScreen,
    icon: { name: '', type: 'antdesign' },
  },
  Forgot: {
    screen: PasswordForgotScreen,
    icon: { name: '', type: 'antdesign' },
  },
  Resend: {
    screen: ResendSignUpScreen,
    icon: { name: '', type: 'antdesign' },
  },
  Change: {
    screen: PasswordChangeScreen,
    icon: { name: 'lock', type: 'antdesign' },
  },
  CompleteRegistration: {
    screen: CompleteRegistrationScreen,
    icon: { name: 'lock', type: 'antdesign' },
  },
  Reset: {
    screen: PasswordResetScreen,
    icon: { name: '', type: 'antdesign' },
  },
  Confirm: {
    screen: ConfirmSignUpScreen,
    icon: { name: '', type: 'antdesign' },
  },
  VerifyContact: {
    screen: VerifyContactScreen,
    icon: { name: '', type: 'antdesign' },
  },
  Busy: {
    screen: BusyOverlayScreen,
    icon: { name: '', type: 'feather' },
  },
  MoreStack: {
    screen: null,
    icon: StyleGuide.userIcon,
  },
};
