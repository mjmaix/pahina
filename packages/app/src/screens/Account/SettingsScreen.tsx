import React from 'react';
import { ListRenderItem } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList, NavigationScreenProps } from 'react-navigation';

import { NavigationService } from '../../utils';

type Props = NavigationScreenProps;
interface State {}

class SettingsScreen extends React.Component<Props, State> {
  public readonly state: State = { mfa: 'NOMFA', enableMfa: false };

  public renderItem: ListRenderItem<any> = ({ item, index }) => (
    <ListItem key={index} {...item} />
  );

  public render() {
    const list = [
      {
        title: 'Choose your theme',
        onPress: () => NavigationService.navigate('SelectTheme'),
        chevron: true,
        bottomDivider: true,
      },
      {
        title: 'Multi-factor authentication (MFA)',
        onPress: () => NavigationService.navigate('SelectMfa'),
        chevron: true,
        bottomDivider: true,
      },
    ];
    return (
      <FlatList<any>
        keyExtractor={(item, i: number) => i.toString()}
        data={list}
        renderItem={this.renderItem}
      />
    );
  }
}

export { SettingsScreen };
