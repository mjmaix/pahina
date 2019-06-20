import { Formik, FormikActions, FormikProps } from 'formik';
import React, { Component, Fragment } from 'react';
import {
  NavigationEventSubscription,
  NavigationScreenProps,
} from 'react-navigation';

import { StyleGuide, WrapKnownExceptions } from '../../core';
import {
  ProfileModel,
  UpdateProfileSchema,
  handleCheckContactVerified,
  handleAppSyncUserUpdate,
  handleGetCurrentUserAttrs,
  handlePressVerifyContact,
  handleSignOut,
  handleUpdateProfile,
  handleVerifyContactResend,
} from '../../stores';
import {
  FormikButtonInjector,
  FormikInputInjector,
  withFormikMemoize,
  MemoFormikFormErrorText,
  EmailInput,
  FormikPreviewAvatar,
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledScrollView,
  StyledTextInput,
  StyledView,
} from '../../components';
import {
  AsyncImagePicker,
  Busy,
  NavigationService,
  getMime,
  logInfo,
  alertFail,
  alertOk,
} from '../../utils';

interface Props extends NavigationScreenProps {}
type FormModel = typeof ProfileModel;

const InitialState: {
  showVerifyEmail: boolean;
  showVerifyPhone: boolean;
  form: FormModel;
  isFormReady: boolean;
} = {
  showVerifyEmail: false,
  showVerifyPhone: false,
  isFormReady: false,
  form: { ...ProfileModel },
};

class ProfileScreen extends Component<Props, typeof InitialState> {
  public state = InitialState;
  private willFocusListener?: NavigationEventSubscription;

  public async componentDidMount() {
    handleGetCurrentUserAttrs().then(form => {
      this.setState(prev => ({
        form: {
          ...prev.form,
          ...{
            email: form.email || '',
            family_name: form.family_name || '',
            given_name: form.given_name || '',
            phone_number: form.phone_number || '',
            picture: form.picture || '',
          },
        },
        isFormReady: true,
      }));
    });
    const { navigation } = this.props;
    this.willFocusListener = navigation.addListener('willFocus', () => {
      this.checkVerifiedContact();
    });
  }

  public componentWillUnmount() {
    if (this.willFocusListener) {
      this.willFocusListener.remove();
    }
  }

  private checkVerifiedContact = async () => {
    const showVerifyEmail = !(await handleCheckContactVerified('email'));
    // const showVerifyPhone = !(await handleCheckContactVerified('phone_number'));

    this.setState({ showVerifyEmail });
  };

  private renderAvatar = (fProps: FormikProps<FormModel>) => (
    <FormikPreviewAvatar fProps={fProps} dataKey="picture" />
  );

  private renderExtraButtons = () => {
    const { showVerifyEmail, showVerifyPhone } = this.state;
    return (
      <Fragment>
        <StyledButton
          label="Change password"
          onPress={this.handlePressChangePassword}
          type="clear"
        />
        {showVerifyEmail && (
          <StyledButton
            label="Verify email"
            onPress={() => handlePressVerifyContact('email')}
            type="clear"
          />
        )}
        {showVerifyPhone && (
          <StyledButton
            label="Verify mobile"
            onPress={() => handlePressVerifyContact('phone_number')}
            type="clear"
          />
        )}
        <StyledButton
          label="Sign out"
          onPress={this.handleSignOutAsync}
          type="clear"
        />
      </Fragment>
    );
  };

  private renderForm = () => {
    const MemoizedImageAvatar = withFormikMemoize(this.renderAvatar, 'picture');
    return (
      <Formik<FormModel>
        enableReinitialize
        initialValues={this.state.form}
        validationSchema={UpdateProfileSchema}
        onSubmit={this.onSave}
      >
        {fProps => {
          return (
            <StyledFormContainer>
              <StyledFormRow>
                <StyledView
                  style={{
                    padding: StyleGuide.gap.big,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MemoizedImageAvatar {...fProps} />
                </StyledView>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="email" formProps={fProps}>
                  <StyledTextInput
                    as={EmailInput}
                    label="Email"
                    placeholder=""
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="given_name" formProps={fProps}>
                  <StyledTextInput
                    label="Given name"
                    textContentType="givenName"
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="family_name" formProps={fProps}>
                  <StyledTextInput
                    label="Family name"
                    textContentType="familyName"
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="phone_number" formProps={fProps}>
                  <StyledTextInput
                    label="Mobile"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    textContentType="telephoneNumber"
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <MemoFormikFormErrorText {...fProps} />
              </StyledFormRow>

              <StyledFormRow>
                <FormikButtonInjector formProps={fProps}>
                  <StyledButton onPress={fProps.handleSubmit} label={'Save'} />
                </FormikButtonInjector>
              </StyledFormRow>

              {this.renderExtraButtons()}
            </StyledFormContainer>
          );
        }}
      </Formik>
    );
  };

  private handleSignOutAsync = async () => {
    try {
      await handleSignOut();
      alertOk(() => NavigationService.navigate('Auth'));
    } catch (err) {
      alertFail(() => null, err);
    }
  };

  private handlePressChangePassword = () => {
    NavigationService.navigate('Change');
  };

  private handlePressVerifyContactResend = async (contact: CognitoContact) => {
    try {
      Busy.start();
      await handleVerifyContactResend(contact);
      alertOk(() => handlePressVerifyContact(contact));
    } catch (err) {
      alertFail(() => null, err);
    } finally {
      Busy.stop();
    }
  };

  private onSave = async <T extends FormModel>(
    form: T,
    actions: FormikActions<T>,
  ) => {
    const oldAttrs = this.state.form;
    const newAttrs = form;

    const picChanged = oldAttrs.picture !== newAttrs.picture;

    try {
      const newForm: FormModel = { ...form };
      if (picChanged) {
        const mime = getMime(newAttrs.picture);
        const config: StorageConfig = {
          level: 'protected',
          contentType: mime || 'image/jpg',
          progressCallback: ({ loaded, total }) => {
            logInfo(`Uploaded: ${loaded}/${total}`);
          },
        };
        const newPicUrl = await AsyncImagePicker.uploadImage(
          newAttrs.picture,
          config,
        ).catch(WrapKnownExceptions);
        newForm.picture = newPicUrl;
      }
      await handleUpdateProfile(newForm);
      await handleAppSyncUserUpdate();
      this.checkVerifiedContact();
      alertOk(() => null);
    } catch (err) {
      actions.setFieldError('form', err.message);
      alertFail(() => null, err);
    } finally {
      actions.setSubmitting(false);
    }
  };

  public render() {
    return (
      <StyledScrollView>
        <StyledScreenContainer
          style={{
            justifyContent: 'space-between',
          }}
        >
          {this.renderForm()}
        </StyledScreenContainer>
      </StyledScrollView>
    );
  }
}

export { ProfileScreen };
