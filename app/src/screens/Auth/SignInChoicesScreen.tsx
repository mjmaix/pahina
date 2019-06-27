import React, { Component } from 'react';
import { Image, ImageBackground } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ThemedComponentProps, withTheme } from 'styled-components';

import BannerImage from '../../../assets/splash.png';
import {
  Header,
  StyledButton,
  StyledFormContainer,
  StyledFormOverImageContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledView,
} from '../../components';
import { NavigationService } from '../../utils';
import { BRAND_NAME } from '../../utils/constants';

type Props = NavigationScreenProps & ThemedComponentProps;

class SignInChoicesScreen extends Component<Props> {
  public render() {
    const { theme } = this.props;
    return (
      <ImageBackground
        source={Image.resolveAssetSource(BannerImage)}
        resizeMode="stretch"
        style={{
          flex: 1,
        }}
      >
        <StyledScreenContainer>
          <StyledFormOverImageContainer>
            <Header
              title={BRAND_NAME}
              headerStyle={{
                color: theme.colors.primary,
                shadowColor: theme.colors.primarytext,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            />
            <StyledFormContainer
              as={StyledView} /* prevent scroll but retain form style*/
            >
              <StyledFormRow>
                <StyledButton
                  onPress={this.onPressSignInWithEmail}
                  label={'Sign in with Email'}
                />
              </StyledFormRow>

              {false && (
                <StyledFormRow>
                  <StyledButton
                    onPress={this.onPressSignInWithPhoneNumber}
                    label={'Sign in with Mobile'}
                  />
                </StyledFormRow>
              )}

              <StyledFormRow>
                <StyledButton
                  onPress={this.onPressSignUp}
                  label={'Sign up'}
                  type="outline"
                />
              </StyledFormRow>

              <StyledFormRow>
                <StyledButton
                  onPress={this.onPressForgotPassword}
                  label={'Forgot password?'}
                  type="clear"
                />
              </StyledFormRow>
            </StyledFormContainer>
          </StyledFormOverImageContainer>
        </StyledScreenContainer>
      </ImageBackground>
    );
  }

  private onPressSignInWithEmail = () => {
    NavigationService.navigate('SignInEmail');
  };

  private onPressSignInWithPhoneNumber = () => {
    NavigationService.navigate('SignInPhoneNumber');
  };

  private onPressSignUp = () => {
    NavigationService.navigate('SignUp');
  };

  private onPressForgotPassword = () => {
    NavigationService.navigate('Forgot');
  };
}

const ThemedSignInChoicesScreen = withTheme(SignInChoicesScreen);

export { ThemedSignInChoicesScreen as SignInChoicesScreen };
