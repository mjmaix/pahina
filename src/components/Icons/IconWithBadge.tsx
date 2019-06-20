import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import { IconObject } from '.';

interface Props {
  icon: IconObject;
  badgeValue?: number | string;
  color?: string;
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export class IconWithBadge extends React.Component<Props> {
  public render() {
    const { icon, badgeValue, color } = this.props;
    return (
      <View style={styles.iconContainer}>
        <Icon {...icon} iconStyle={{ color }}>
          <Badge value={badgeValue} />
        </Icon>
      </View>
    );
  }
}
