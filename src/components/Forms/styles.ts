import { StyleSheet } from 'react-native';
import { formStyles } from './../commonStyles';

export const styles = StyleSheet.create({
  ...formStyles,
  input: {
    textAlign: 'center',
  },
  inputMessage: {
    textAlign: 'center',
  },
  error: {
    color: 'red',
  },
  button: {
    alignSelf: 'center',
    width: '100%',
  },
});
