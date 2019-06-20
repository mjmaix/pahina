import React from 'react';
import { Input } from 'react-native-elements';
import styled from 'styled-components/native';

export const StyledTextInput = styled(Input).attrs(props => {
  return {
    editable: props.editable,
  };
})``;
