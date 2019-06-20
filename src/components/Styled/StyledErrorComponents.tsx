import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { ErrorText } from '../Forms/ErrorText';

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
});

export const StyledBoldText = styled.Text`
  ${props => ({
    ...styles.text,
    color: props.theme.colors.primary,
  })}
`;

export const StyledErrorText = styled(ErrorText)`
  ${props => ({
    ...styles.text,
    color: props.theme.colors.error,
    alignSelf: 'center',
  })}
`;
