import React from 'react';
import { withTheme, ThemedComponentProps } from 'styled-components';
import { StyledPrice, StyledPriceInfo } from '../Styled';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import { ShopifyGraphQlVariant } from '../../types';

interface FreeCompProps extends ThemedComponentProps {
  variant: ShopifyGraphQlVariant;
}

function FreePriceComp({ variant, theme: { colors } }: FreeCompProps) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text>
        <StyledPrice>{`FREE`}</StyledPrice>
        <StyledPriceInfo style={{ textDecorationLine: 'line-through' }}>{` ₱ ${
          variant.compareAtPrice
        }`}</StyledPriceInfo>
      </Text>
      <StyledPriceInfo>{`for the next ${
        variant.inventoryQuantity
      } buyer(s) `}</StyledPriceInfo>
    </View>
  );
}

const ThemedFreePrice = withTheme(FreePriceComp);

export { ThemedFreePrice as FreePrice };
