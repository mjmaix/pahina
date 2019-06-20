import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Icon, IconProps } from 'react-native-elements';

import { StyleGuide } from '../../core';
import { ScreenName } from '../../routes/mappings';
import { NavigationService, alertClose } from '../../utils';

interface FixedBackHeaderProps {
  iconProps?: IconProps;
  confirm?: boolean;
  backTo?: ScreenName;
}

export const FixedBackHeader = ({
  iconProps,
  confirm,
  backTo,
}: FixedBackHeaderProps) => {
  const backAction = () => {
    if (backTo) {
      NavigationService.navigate(backTo);
    } else {
      NavigationService.goBack();
    }
  };
  const onPress = () => {
    if (!confirm) {
      backAction();
    } else {
      alertClose(() => backAction());
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button
        containerStyle={styles.buttonContainer}
        onPress={onPress}
        icon={<Icon name="chevron-left" type={'entypo'} {...iconProps} />}
        type="clear"
        hitSlop={{ ...StyleGuide.hitSlop, right: 50 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  buttonContainer: {
    marginTop: StyleGuide.gap.big,
  },
});
