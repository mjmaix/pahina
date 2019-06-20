import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { themes } from '../../core';

type Theme = typeof themes[0];

interface ThemeListItem {
  item: Theme;
  onPress: (param: Theme) => void;
}

export function ThemeListItem({ item, onPress }: ThemeListItem) {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: item.colors.bgColor,
          },
        ]}
      >
        <Text style={[styles.itemText, { color: item.colors.primary }]}>
          {item.id}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 100,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  itemText: { fontWeight: 'bold' },
});
