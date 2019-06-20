import 'jest-styled-components/native';

import React from 'react';
import { Text } from 'react-native';
import { render } from 'react-native-testing-library';

import { StyledScrollView } from './StyledScrollView';

const createTestProps = (props?: object) => ({
  testID: 'testid',
  ...props,
});

test('it works', () => {
  const props = createTestProps();
  const { getByTestId } = render(
    <StyledScrollView {...props}>
      <Text>TEST</Text>
    </StyledScrollView>,
  );
  expect(getByTestId('testid')).toMatchSnapshot();
});
