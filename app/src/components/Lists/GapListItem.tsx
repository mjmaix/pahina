import React from 'react';
import { ListItem, ListItemProps } from 'react-native-elements';
import { containerStyles, otherStyles } from '../commonStyles';

export const GapListItem = (props: ListItemProps) => {
  return (
    <ListItem
      containerStyle={containerStyles.transparent}
      contentContainerStyle={otherStyles.noHeight}
      disabled={true}
      {...props}
    />
  );
};
