import React, { Component } from 'react';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';

class SimpleFlatList<T extends any> extends Component<FlatListProps<T>> {
  public render() {
    return (
      <FlatList<T>
        style={styles.flatList}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {},
  flatList: {
    width: '100%',
  },
  listItem: {},
});

export { SimpleFlatList };
