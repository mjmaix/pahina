import React from 'react';
import { Icon } from 'react-native-elements';
import { ThemedComponentProps, withTheme } from 'styled-components';

const FixedActionButton = withTheme(
  class extends React.Component<ThemedComponentProps> {
    public render() {
      const { theme } = this.props;
      return (
        <Icon
          name="new-message"
          type="entypo"
          raised
          reverse
          onPress={() => null}
          color={theme.colors.primary}
          underlayColor={theme.colors.primarylight}
        />
      );
    }
  },
);

export { FixedActionButton };
