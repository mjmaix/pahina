import React from 'react';
import { withTheme, ThemedComponentProps } from 'styled-components';
import { SafeAreaView } from 'react-native';
import { StyledButton } from '../Styled';
import { ThemedIcon, IconCollection } from '../Icons';
import { containerStyles } from '../commonStyles';
import { hexToRgbA } from '../../utils';

interface Props extends ThemedComponentProps {
  onPress: () => void;
  label: string;
  opacity?: number;
}

const FooterButton = (props: Props) => {
  const {
    onPress,
    label,
    theme: { colors },
    opacity,
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
      <StyledButton
        onPress={onPress}
        label={label + ' '}
        buttonStyle={[
          containerStyles.fullWidth,
          { borderRadius: 0, ...containerStyles.transparent },
        ]}
        iconRight
        icon={<ThemedIcon {...IconCollection.externalLink} darktext />}
      />
    </SafeAreaView>
  );
};

const ThemedFooterButton = withTheme(FooterButton);

export { ThemedFooterButton as FooterButton };
