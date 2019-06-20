import React from 'react';

import { StyledBoldText } from '../Styled/StyledErrorComponents';
import { StyledCenterContainer } from '../Styled/StyledScreenContainer';

function ListEmptyComponent(props: { message: string }) {
  return (
    <StyledCenterContainer>
      <StyledBoldText>{props.message}</StyledBoldText>
    </StyledCenterContainer>
  );
}

export { ListEmptyComponent };
