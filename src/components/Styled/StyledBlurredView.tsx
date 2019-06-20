import styled from 'styled-components/native';

import { StyledView } from './StyledView';

// TODO: use Blur
export const StyledBlurredView = styled(StyledView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
`;
