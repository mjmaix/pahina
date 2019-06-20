import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
      <KeyboardAwareScrollView
        style={[style]}
        contentContainerStyle={[contentContainerStyle]}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  }
}
