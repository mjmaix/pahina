import { RefAttributes } from 'react';
import { View, ViewProps } from 'react-native';
import styled from 'styled-components/native';

import { containerStyles, formStyles } from '../commonStyles';
import { StyleGuide } from '../../themes';

type StyledBottomContainerProps = ViewProps &
  RefAttributes<View> & { rightContent?: boolean };

export const StyledTopContainer = styled.View`
  ${props => ({
    ...containerStyles.fixedTop,
    ...containerStyles.fullWidth,
  })}
`;

export const StyledBottomContainer = styled.View<StyledBottomContainerProps>`
  ${props => ({
    ...containerStyles.fixedBottom,
    ...containerStyles.fullWidth,
    ...(props.rightContent
      ? { padding: StyleGuide.gap.regular, alignItems: 'flex-end' }
      : {}),
  })}
`;

export const StyledFormRow = styled.View`
  ${props => ({
    ...formStyles.formItem,
  })}
`;
