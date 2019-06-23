import styled from 'styled-components';

import { FormKeyboardAvoidingView } from '../Forms';
import { formStyles } from '../commonStyles';

export const StyledFormContainer = styled(FormKeyboardAvoidingView).attrs(
  props => ({
    contentContainerStyle: {
      flexGrow: 1,
      justifyContent: 'center',
    },
  }),
)`
  ${props => ({
    ...formStyles.form,
  })}
`;
