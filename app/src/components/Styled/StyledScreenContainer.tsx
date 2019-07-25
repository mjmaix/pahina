import styled from 'styled-components/native';

import { containerStyles } from '../commonStyles';

export const StyledScreenContainer = styled.SafeAreaView`
  ${props => ({
    ...containerStyles.fullCenter,
    backgroundColor: props.theme.colors.greyBackground,
  })};
`;

export const StyledCenterContainer = styled.SafeAreaView`
  ${props => ({
    ...containerStyles.fullCenter,
    backgroundColor: props.theme.colors.greyBackground,
  })};
`;
