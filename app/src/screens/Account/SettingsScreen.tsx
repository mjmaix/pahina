import React from 'react';
import { ListRenderItem, Alert } from 'react-native';
import { ListItem, ListItemProps } from 'react-native-elements';
import { NavigationScreenProps, SectionList } from 'react-navigation';

import { NavigationService } from '../../utils';
import { GapListItem } from '../../components';

type Props = NavigationScreenProps;

const accountSection: ListItemProps[] = [
  {
    title: 'Profile',
    onPress: () => NavigationService.navigate('Profile'),
    chevron: true,
    bottomDivider: true,
  },
  {
    title: 'Address Book',
    onPress: () => Alert.alert('not yet implemented'),
    chevron: true,
    bottomDivider: true,
  },
];

const securitySection: ListItemProps[] = [
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

const themeSection: ListItemProps[] = [
  {
    title: 'Choose your theme',
    onPress: () => NavigationService.navigate('Profile'),
    chevron: true,
    bottomDivider: true,
  },
];

const othersSection: ListItemProps[] = [
  {
    title: 'Policies',
    onPress: () => Alert.alert('not yet implemented'),
    chevron: true,
    bottomDivider: true,
  },
  {
    title: 'FAQ',
    onPress: () => Alert.alert('not yet implemented'),
    chevron: true,
    bottomDivider: true,
  },
  {
    title: 'Submit Feedback',
    onPress: () => Alert.alert('not yet implemented'),
    chevron: true,
    bottomDivider: true,
  },
];

const sections = [
  {
    title: 'Account',
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
];

const renderItem: ListRenderItem<any> = ({ item, index }) => {
  return <ListItem key={`${item.title}_${index}`} {...item} />;
};

const SettingsScreen = (props: Props) => {
  return (
    <SectionList
      style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
      keyExtractor={(item, i: number) => i.toString()}
      stickySectionHeadersEnabled={false}
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => <GapListItem />}
    />
  );
};

export { SettingsScreen };
