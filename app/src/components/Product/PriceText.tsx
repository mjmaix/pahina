import React from 'react';
import { ThemedComponentProps, withTheme } from 'styled-components';
import _ from 'lodash';
import { parseProductVariants } from '../../api-helpers';
import { ShopifyGraphQlProduct } from '../../types';
import { View } from 'react-native';
import { FreePrice } from './FreePriceComp';
import { StyledPrice } from '../Styled';

type Props = ThemedComponentProps & {
  product: ShopifyGraphQlProduct;
};

const PriceText = (props: Props) => {
  const { product } = props;

  const variants = parseProductVariants(product);
  const { Free, Paid } = variants;
  const isFree = Number(Free.inventoryQuantity) > 0;

  return (
    <View style={{ flexDirection: 'column' }}>
      {isFree && <FreePrice variant={Free} />}
      {!isFree && (
        <StyledPrice style={{ alignSelf: 'center' }}>{`₱ ${
          Paid.price
        }`}</StyledPrice>
      )}
    </View>
  );
};

const ThemedPriceText = withTheme(PriceText);

export { ThemedPriceText as PriceText };
