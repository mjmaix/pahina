import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar as RNESearchBar } from 'react-native-elements';

interface SearchProps {
  placeholder: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ placeholder, onChangeText }: SearchProps) => {
  const [text, setText] = useState('');
  return (
    <RNESearchBar
      containerStyle={styles.searchContainer}
      inputContainerStyle={styles.searchInputContainer}
      round
      placeholder={placeholder}
      onChangeText={(t: string) => {
        onChangeText(t);
        setText(t);
      }}
      value={text}
    />
  );
};

SearchBar.defaultProps = {
  placeholder: 'Search',
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchInputContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderColor: 'transparent',
  },
});
