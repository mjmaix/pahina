import styled from 'styled-components/native';

import { containerStyles } from '../commonStyles';

export const StyledScreenContainer = styled.SafeAreaView`
  ${props => ({
    ...containerStyles.fullCenter,
  })};
`;

export const StyledCenterContainer = styled.SafeAreaView`
  ${props => ({
    ...containerStyles.fullCenter,
  })};
`;
