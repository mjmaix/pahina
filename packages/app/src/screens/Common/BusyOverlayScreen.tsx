import React from 'react';
import { ActivityIndicator } from 'react-native';

import { FixedBackHeader } from '../../components';
import { StyledBlurredView, StyledTopContainer } from '../../components';

export const BusyOverlayScreen = () => {
  return (
    <StyledBlurredView>
      <StyledTopContainer>
        <FixedBackHeader iconProps={{ name: 'close', type: 'antdesign' }} />
      </StyledTopContainer>
      <ActivityIndicator size="large" />
    </StyledBlurredView>
  );
};
