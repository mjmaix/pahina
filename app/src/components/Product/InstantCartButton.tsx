import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import _ from 'lodash';
import { withTheme, ThemedComponentProps } from 'styled-components';

import { ShopifyGraphQlVariant, ShopifyRestAddress } from '../../types';
import { getCartLink } from '../../api-helpers/productHelpers';
import { ConfigConsumer, ConfigStoreInfo } from '../../stores';
import { AddressesContainerInstance } from '../../unstated';
import { NavigationService, alertConfirm, Busy } from '../../utils';
import { handleGetCurrentUserAttrs, logError, pretty } from '../../shared';
import { FooterButton } from '../Footers';

interface OpenBrowserParams {
  toolbarColor?: string;
  browserPackage?: string;
  enableBarCollapsing?: boolean;
  showTitle?: boolean;
}

interface Props extends ThemedComponentProps {
  data?: ShopifyGraphQlVariant;
}

const InstantCartButton = ({ data, theme }: Props) => {
  const label = !data ? 'Select a variant' : 'Buy now to read';
  const browserParams = {
    toolbarColor: theme.colors.primary,
    collapseToolbar: true,
  };
  return (
    <ConfigConsumer>
      {config => {
        return (
          <FooterButton
            buttonProps={{
              disabled: !data,
              title: label + ' ',
              onPress: onPressEvent(config, data, browserParams),
            }}
          />
        );
      }}
    </ConfigConsumer>
  );
};

const ThemedInstantCartButton = withTheme(InstantCartButton);

export { ThemedInstantCartButton as InstantCartButton };

const onPressEvent = (
  config: ConfigStoreInfo,
  data?: ShopifyGraphQlVariant,
  browserOpts?: OpenBrowserParams,
) => async () => {
  try {
    Busy.start();

    await AddressesContainerInstance.fetchData();
    const userAttrs = await handleGetCurrentUserAttrs();

    const { addresses } = AddressesContainerInstance.state;
    const defaultBilling = _.first(_.filter(addresses, 'default')) as
      | ShopifyRestAddress
      | undefined;

    if (_.isEmpty(defaultBilling) || _.isEmpty(addresses)) {
      return void onEmptyBillingAddress();
    }

    if (!userAttrs.email_verified) {
      return void onUnverifiedEmail();
    }

    // proceed
    const instantCartLink = getCartLink(
      config,
      data,
      defaultBilling,
      userAttrs.email,
    );

    return void WebBrowser.openBrowserAsync(instantCartLink, browserOpts);
  } catch (err) {
    logError('InstantCartButton.onPressEvent', pretty(err));
  } finally {
    Busy.stop();
  }
  return;
};

const onEmptyBillingAddress = () =>
  alertConfirm(() => NavigationService.navigate('Address'), {
    title: 'Billing information required',
    message:
      'You will be redirected to create a default billing address. You can purchase this item afterwards.',
    okText: 'Proceed',
    cancelText: 'Go back',
  });

const onUnverifiedEmail = () => {
  alertConfirm(() => NavigationService.navigate('VerifyContact'), {
    title: 'Account not yet verified',
    message:
      'Please verify your registered email first. Purchases will be bound the note to your account.',
  });
};
