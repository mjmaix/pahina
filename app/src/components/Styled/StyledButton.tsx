import styled from 'styled-components';
import { Button } from '../Forms';
import { StyleGuide } from '../../themes';

export const StyledButton = styled(Button).attrs(props => ({}))``;

export const StyledDangerButton = styled(Button).attrs(props => ({
  titleStyle: { color: props.theme.colors.danger },
}))`
  padding-top: ${StyleGuide.gap.xl};
  padding-bottom: ${StyleGuide.gap.xl};
`;
