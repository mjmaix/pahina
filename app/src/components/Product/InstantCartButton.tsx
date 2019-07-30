import React from 'react';
import * as WebBrowser from 'expo-web-browser';

import { ShopifyGraphQlVariant } from '../../types';
import { getCartLink } from '../../api-helpers/productHelpers';
import { ConfigConsumer } from '../../stores';
import { containerStyles } from '../commonStyles';
import { StyleGuide } from '../../themes';
import { StyledButton } from '../Styled';

interface Props {
  data?: ShopifyGraphQlVariant;
}

export const InstantCartButton = ({ data }: Props) => {
  return (
    <ConfigConsumer>
      {config => {
        const instantCartLink = getCartLink(config, data);

        return (
          <StyledButton
            disabled={!data}
            label={!data ? 'Select a variant' : 'Buy now to read'}
            onPress={() => WebBrowser.openBrowserAsync(instantCartLink)}
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
};
