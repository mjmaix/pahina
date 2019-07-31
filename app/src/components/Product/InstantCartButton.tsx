import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Subscribe } from 'unstated';
import _ from 'lodash';

import { ShopifyGraphQlVariant } from '../../types';
import { getCartLink } from '../../api-helpers/productHelpers';
import { ConfigConsumer } from '../../stores';
import { containerStyles } from '../commonStyles';
import { StyleGuide } from '../../themes';
import { StyledButton } from '../Styled';
import { AddressesContainerInstance } from '../../unstated';
import { NavigationService, alertConfirm } from '../../utils';

interface Props {
  data?: ShopifyGraphQlVariant;
}

export const InstantCartButton = ({ data }: Props) => (
  <Subscribe to={[AddressesContainerInstance]}>
    {addsCntr => {
      const { addresses } = addsCntr.state;
      return (
        <ConfigConsumer>
          {config => {
            const instantCartLink = getCartLink(config, data);

            const defaultBilling = _.find(addresses, a => a.default);
            const label = !data ? 'Select a variant' : 'Buy now to read';
            let buttonAction: () => void | Promise<any> = () =>
              WebBrowser.openBrowserAsync(instantCartLink);

            if (_.isEmpty(defaultBilling)) {
              buttonAction = onEmptyBillingAddress;
            }

            return (
              <StyledButton
                disabled={!data}
                label={label}
                onPress={buttonAction}
                containerStyle={[
                  containerStyles.fullWidth,
                  {
                    padding: StyleGuide.gap.big,
                  },
                ]}
              />
            );
          }}
        </ConfigConsumer>
      );
    }}
  </Subscribe>
);

const onEmptyBillingAddress = () =>
  alertConfirm(
    () => {
      NavigationService.navigate('Address');
    },
    {
      title: 'Billing information required',
      message:
        'You will be redirected to create a default billing address. You can purchase this item afterwards.',
      okText: 'Proceed',
      cancelText: 'Go back',
    },
  );
