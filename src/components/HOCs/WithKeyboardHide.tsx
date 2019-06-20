import React, { Component, Fragment } from 'react';
import { EmitterSubscription, Keyboard, Platform, View } from 'react-native';

interface WithKeyboardHideProps {}

interface WithKeyboardHideState {
  keyboardUp: boolean;
}

class WithKeyboardHide extends Component<
  WithKeyboardHideProps,
  WithKeyboardHideState
> {
  private showListener?: EmitterSubscription;
  private hideListener?: EmitterSubscription;

  public readonly state = {
    keyboardUp: false,
  };

  public componentWillMount() {
    this.showListener = Keyboard.addListener(
      Platform.select({ ios: 'keyboardWillShow', android: 'keyboardDidShow' }),
      this.keyboardDidShow.bind(this),
    );
    this.hideListener = Keyboard.addListener(
      Platform.select({ ios: 'keyboardWillHide', android: 'keyboardDidHide' }),
      this.keyboardDidHide.bind(this),
    );
  }

  public componentWillUnmount() {
    if (this.showListener) {
      this.showListener.remove();
    }
    if (this.hideListener) {
      this.hideListener.remove();
    }
  }

  public keyboardDidShow() {
    this.setState({
      keyboardUp: true,
    });
  }

  public keyboardDidHide() {
    this.setState({
      keyboardUp: false,
    });
  }

  public render() {
    if (this.state.keyboardUp) {
      return <View />;
    }
    const { children, ...props2 } = this.props;

    return <Fragment {...props2}>{children}</Fragment>;
  }
}

export { WithKeyboardHide };
