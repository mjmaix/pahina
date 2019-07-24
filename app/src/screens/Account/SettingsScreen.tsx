import React from 'react';
import { ListRenderItem, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationScreenProps, SectionList } from 'react-navigation';

import { NavigationService } from '../../utils';

type Props = NavigationScreenProps;
interface State {}

class SettingsScreen extends React.Component<Props, State> {
  public readonly state: State = { mfa: 'NOMFA', enableMfa: false };

  public renderItem: ListRenderItem<any> = ({ item, index, section }) => (
    <ListItem key={index} {...item} />
  );

  public render() {
    const accountSection = [
      {
        title: 'Account Information',
        oPress: () => Alert.alert('not yet implemented'),
        chevron: true,
        bottomDivider: true,
      },
      {
        title: 'Address Book',
        oPress: () => Alert.alert('not yet implemented'),
        chevron: true,
        bottomDivider: true,
      },
    ];

    const securitySection = [
      {
        title: 'Change Password',
        onPress: () => Alert.alert('not yet implemented'),
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
    const themeSection = [
      {
        title: 'Choose your theme',
        onPress: () => NavigationService.navigate('SelectTheme'),
        chevron: true,
        bottomDivider: true,
      },
    ];

    const othersSection = [
      {
        title: 'Policies',
        oPress: () => Alert.alert('not yet implemented'),
        chevron: true,
        bottomDivider: true,
      },
      {
        title: 'FAQ',
        oPress: () => Alert.alert('not yet implemented'),
        chevron: true,
        bottomDivider: true,
      },
      {
        title: 'Feedback',
        oPress: () => Alert.alert('not yet implemented'),
        chevron: true,
        bottomDivider: true,
      },
    ];
    return (
      <SectionList
        style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
        keyExtractor={(item, i: number) => i.toString()}
        stickySectionHeadersEnabled={false}
        sections={[
          {
            title: 'Account Information',
            data: accountSection,
          },
          {
            title: 'Account Security',
            data: securitySection,
          },
          {
            title: 'UI',
            data: themeSection,
          },
          {
            title: 'Others',
            data: othersSection,
          },
        ]}
        renderItem={this.renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <ListItem
            // title={title}
            containerStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.0)',
            }}
            contentContainerStyle={{
              height: 0,
            }}
            disabled={true}
          />
        )}
      />
    );
  }
}

export { SettingsScreen };
