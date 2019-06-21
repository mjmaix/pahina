import 'jest-styled-components/native';

import React from 'react';
import { Text } from 'react-native';
import { render } from 'react-native-testing-library';

import { StyledScreenContainer } from './StyledScreenContainer';

const createTestProps = (props?: object) => ({
  testID: 'testid',
  ...props,
});

test('it works', () => {
  const props = createTestProps();
  const { getByTestId } = render(
    <StyledScreenContainer {...props}>
      <Text>TEST</Text>
    </StyledScreenContainer>,
  );
  expect(getByTestId('testid')).toMatchSnapshot();
});
