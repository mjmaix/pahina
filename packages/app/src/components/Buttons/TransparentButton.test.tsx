import React from 'react';
import { fireEvent, render } from 'react-native-testing-library';
import { TransparentButton as Button } from './TransparentButton';

const onPressMock = jest.fn();

const createTestProps = (props?: object) => ({
  label: 'Text',
  onPress: onPressMock,
  testID: 'button',
  ...props,
});

describe('TransparentButton', () => {
  const props = createTestProps();
  const { getByTestId } = render(<Button {...props} />);
  fireEvent.press(getByTestId('button'));

  it('should render a label', () => {
    expect(getByTestId('button')).toBeDefined();
  });

  it('should invoke onPress', () => {
    expect(onPressMock).toHaveBeenCalled();
  });
});
