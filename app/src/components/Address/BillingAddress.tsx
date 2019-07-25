import React from 'react';
import { ThemedComponentProps, withTheme } from 'styled-components';
import { ShopifyRestAddress } from '../../screens/Shopify/types';
import { Text } from 'react-native-elements';

type Props = ThemedComponentProps & {
  address: ShopifyRestAddress;
};

const BillingAddress = (props: Props) => {
  const {
    theme: { colors },
    address,
  } = props;
  return (
    <Text
      style={{
        color: colors.grey3,
        flexDirection: 'column',
      }}
    >
      {!!address.phone && <Text>{address.phone + '\n'}</Text>}
      <Text>{`${address.address1}, ${address.address2}, ${address.city}, ${
        address.province
      }, ${address.country_code}`}</Text>
      {!!address.default && (
        <Text
          style={{ color: colors.success, fontWeight: '500' }}
        >{`\n(Default Billing Address)`}</Text>
      )}
    </Text>
  );
};

const ThemedBillingAddress = withTheme(BillingAddress);

export { ThemedBillingAddress as BillingAddress };
