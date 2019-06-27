import { Auth } from 'aws-amplify';
import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import * as Permissions from 'expo-permissions';

import { StyledScreenContainer } from '../../components';
import { NavigationService, alertOk } from '../../utils';
import { logInfo, logRecord } from '../../shared';

class AuthLoadingScreen extends React.Component<{}> {
  public async componentDidMount() {
    try {
      await Auth.currentUserPoolUser();
      NavigationService.navigate('App');
    } catch (err) {
      logInfo(err);
      NavigationService.navigate('Auth');
    }
    this.checkMultiPermissions();
  }

  public checkMultiPermissions = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alertOk(() => this.askPermissionsAsync(), {
        title: 'Permissions',
        message:
          'Please allow selected permissions for app to serve you better.',
      });
    }
  };

  public askPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      return logRecord({
        name: 'PermissionsCameraRollDenied',
      });
    }
  };

  public render() {
    return (
      <StyledScreenContainer>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </StyledScreenContainer>
    );
  }
}

export { AuthLoadingScreen };
