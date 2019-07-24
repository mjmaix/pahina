import styled from 'styled-components';
import { Button } from '../Forms';

export const StyledButton = styled(Button).attrs(props => ({}))``;

export const StyledDangerButton = styled(Button).attrs(props => ({
  titleStyle: { color: props.theme.colors.danger },
}))``;
