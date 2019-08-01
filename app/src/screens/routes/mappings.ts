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
  ProductDetailScreen,
  ProductsScreen,
  CartScreen,
  DecisionsScreen,
  PledgeScreen,
} from '..';
import { StyleGuide } from '../../themes';
import { AddressesScreen } from '../Account/AddressesScreen';
import { AddressFormScreen } from '../Account/AddressFormScreen';
import { MyNotesScreen } from '../Notebook/MyNotesScreen';
import { BecomeSellerScreen } from '../Seller/BecomeSellerScreen';
import { IconCollection } from '../../components';

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
  | 'Shop'
  | 'Product'
  | 'Cart'
  | 'Decisions'
  | 'Pledge'
  | 'Addresses'
  | 'Address'
  | 'BecomeSeller'
  | 'MyNotes'
  // parents
  | 'AuthLoading'
  | 'App'
  | 'Auth'
  | 'AccountStack'
  | 'ShopifyStack'
  | 'DecisionsStack'
  | 'SellerStack'
  | 'NotebookStack'
  | 'Drawer'
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
  Addresses: {
    screen: AddressesScreen,
    icon: { name: '', type: 'font-awesome' },
  },
  Address: {
    screen: AddressFormScreen,
    icon: { name: '', type: 'font-awesome' },
  },
  Busy: {
    screen: BusyOverlayScreen,
    icon: { name: '', type: 'feather' },
  },
  Shop: {
    screen: ProductsScreen,
    icon: { name: 'shopping-bag', type: 'feather' },
  },
  Cart: {
    screen: CartScreen,
    icon: { name: 'shopping-cart', type: 'feather' },
  },
  Pledge: {
    screen: PledgeScreen,
    icon: { name: 'pushpino', type: 'antdesign' },
  },
  Decisions: {
    screen: DecisionsScreen,
    icon: { name: 'balance-scale', type: 'font-awesome' },
  },
  Product: {
    screen: ProductDetailScreen,
    icon: { name: '', type: 'font-awesome' },
  },
  MyNotes: {
    screen: MyNotesScreen,
    icon: { name: 'notebook', type: 'material-community' },
  },
  BecomeSeller: {
    screen: BecomeSellerScreen,
    icon: { name: 'feather', type: 'feather' },
  },
  Drawer: {
    screen: null,
    icon: IconCollection.burger,
  },
  ShopifyStack: {
    screen: null,
    icon: { name: 'shopify', type: 'material-community' },
  },
  AccountStack: {
    screen: null,
    icon: { type: 'antdesign', name: 'setting' },
  },
  DecisionsStack: {
    screen: null,
    icon: { name: 'balance-scale', type: 'font-awesome' },
  },
  NotebookStack: {
    screen: null,
    icon: { name: 'notebook', type: 'material-community' },
  },
  SellerStack: {
    screen: null,
    icon: { name: 'feather', type: 'material-community' },
  },
};
