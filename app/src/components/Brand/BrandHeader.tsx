import React from 'react';
import { withTheme, ThemedComponentProps } from 'styled-components';
import { Header } from '../Headers';
import { BRAND_NAME } from '../../utils';

type Props = ThemedComponentProps;

const BrandHeader = (props: Props) => {
  const { colors } = props.theme;
  return (
    <Header
      title={BRAND_NAME}
      headerStyle={{
        color: colors.primary,
        shadowColor: colors.primarytext,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    />
  );
};

const ThemedBrandHeader = withTheme(BrandHeader);

export { ThemedBrandHeader as BrandHeader };
