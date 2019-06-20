import React, { Component } from 'react';
import { ScrollView } from 'react-native';

interface FormKeyboardAvoidingViewProps {
  children: Element[];
  style?: any;
  contentContainerStyle?: any;
}

interface FormKeyboardAvoidingViewState {}
export class FormKeyboardAvoidingView extends Component<
  FormKeyboardAvoidingViewProps,
  FormKeyboardAvoidingViewState
> {
  public render() {
    const { children, style, contentContainerStyle } = this.props;

    return (
      <ScrollView
        style={[style]}
        contentContainerStyle={[contentContainerStyle]}
      >
        {children}
      </ScrollView>
    );
  }
}
