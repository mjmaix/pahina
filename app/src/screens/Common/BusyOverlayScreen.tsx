import React from 'react';
import { ActivityIndicator } from 'react-native';

import { FixedBackHeader, IconCollection } from '../../components';
import { StyledBlurredView, StyledTopContainer } from '../../components';

export const BusyOverlayScreen = () => {
  return (
    <StyledBlurredView>
      <StyledTopContainer>
        <FixedBackHeader iconProps={IconCollection.close} />
      </StyledTopContainer>
      <ActivityIndicator size="large" />
    </StyledBlurredView>
  );
};
