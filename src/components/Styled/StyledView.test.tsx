import 'jest-styled-components/native';

import React from 'react';
import { Text } from 'react-native';
import { render } from 'react-native-testing-library';

import { StyledView } from './StyledView';

const createTestProps = (props?: object) => ({
  testID: 'testid',
  ...props,
});

test('it works', () => {
  const props = createTestProps();
  const { getByTestId } = render(
    <StyledView {...props}>
      <Text>TEST</Text>
    </StyledView>,
  );
  expect(getByTestId('testid')).toMatchSnapshot();
});
