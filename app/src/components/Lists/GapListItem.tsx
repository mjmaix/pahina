import React from 'react';
import { ListItem } from 'react-native-elements';
import { containerStyles, otherStyles } from '../commonStyles';

export const GapListItem = () => {
  return (
    <ListItem
      containerStyle={containerStyles.transparent}
      contentContainerStyle={otherStyles.noHeight}
      disabled={true}
    />
  );
};
