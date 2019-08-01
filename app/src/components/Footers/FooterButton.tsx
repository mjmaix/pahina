import React from 'react';
import { withTheme, ThemedComponentProps } from 'styled-components';
import { SafeAreaView } from 'react-native';
import { ThemedIcon, IconCollection } from '../Icons';
import { containerStyles } from '../commonStyles';
import { hexToRgbA } from '../../utils';
import { ButtonProps, Button } from 'react-native-elements';

interface Props extends ThemedComponentProps {
  opacity?: number;
  buttonProps?: ButtonProps;
}

const FooterButton = (props: Props) => {
  const {
    theme: { colors },
    opacity,
    buttonProps,
  } = props;
  let bgColor = colors.primary;
  if (opacity) {
    const rgba = hexToRgbA(colors.primary, opacity);
    bgColor = rgba;
  }
  return (
    <SafeAreaView
      style={[containerStyles.fullWidth, { backgroundColor: bgColor }]}
    >
      <Button
        buttonStyle={[
          containerStyles.fullWidth,
          { borderRadius: 0, ...containerStyles.transparent },
        ]}
        iconRight
        icon={<ThemedIcon {...IconCollection.externalLink} darktext />}
        {...buttonProps}
      />
    </SafeAreaView>
  );
};

const ThemedFooterButton = withTheme(FooterButton);

export { ThemedFooterButton as FooterButton };
