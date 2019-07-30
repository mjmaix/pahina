import React, { Component, Fragment } from 'react';
import {
  StyledScreenContainer,
  StyledScrollView,
  StyledFormContainer,
  StyledFormRow,
  FormikInputInjector,
  MemoFormikFormErrorText,
  StyledTextInput,
  FormikButtonInjector,
  StyledButton,
  StyledDangerButton,
  IconCollection,
  containerStyles,
} from '../../components';
import { AddressModel, AddressSchema } from '../../shared';
import { Formik, FormikActions } from 'formik';
import { alertFail, alertOk, NavigationService } from '../../utils';
import { StyleGuide } from '../../themes';
import { View, Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';
import { withTheme } from 'styled-components';
import { IconProps } from 'react-native-elements';

type FormModel = typeof AddressModel;

const InitialState = { form: AddressModel };

type Props = NavigationScreenProps & ThemedComponentProps;
type State = typeof InitialState;

class AddressFormScreen extends Component<Props, State> {
  public readonly state = InitialState;
  public render() {
    return (
      <StyledScrollView>
        <StyledScreenContainer style={containerStyles.white}>
          {this.renderForm()}
        </StyledScreenContainer>
      </StyledScrollView>
    );
  }

  public componentDidMount() {
    const { navigation } = this.props;

    const paramAddress = navigation.getParam('address') as FormModel;
    if (paramAddress && paramAddress.id) {
      this.setState({ form: paramAddress });
    }
  }

  private renderForm = () => {
    return (
      <Formik<FormModel>
        enableReinitialize
        initialValues={this.state.form}
        validationSchema={AddressSchema}
        onSubmit={this.onSave}
      >
        {fProps => {
          return (
            <StyledFormContainer>
              <View
                style={{
                  height: StyleGuide.gap.big,
                }}
              />
              <StyledFormRow>
                <FormikInputInjector dataKey="first_name" formProps={fProps}>
                  <StyledTextInput
                    label="Given name"
                    textContentType="givenName"
                    placeholder="Juan"
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="last_name" formProps={fProps}>
                  <StyledTextInput
                    label="Family name"
                    textContentType="familyName"
                    placeholder="dela Cruz"
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="address1" formProps={fProps}>
                  <StyledTextInput
                    label="House Number, Building, and Street"
                    textContentType="streetAddressLine1"
                    placeholder="46 Brgy. Del Monte, Osmeña St."
                    multiline
                    numberOfLines={3}
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="city" formProps={fProps}>
                  <StyledTextInput
                    label="City"
                    textContentType="addressCity"
                    placeholder="Quezon City"
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="province" formProps={fProps}>
                  <StyledTextInput
                    label="Province"
                    textContentType="addressState"
                    placeholder="Metro Manila"
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="zip" formProps={fProps}>
                  <StyledTextInput
                    label="Postal code"
                    textContentType="postalCode"
                    placeholder="1105"
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

  private onSave = async <T extends FormModel>(
    form: T,
    actions: FormikActions<T>,
  ) => {
    const oldAttrs = this.state.form;
    const newAttrs = form;

    try {
      const newForm: FormModel = { ...form };

      // await handleSaveNewAddress(newForm);
      Alert.alert('not yet implemented');
      alertOk(() => null);
    } catch (err) {
      actions.setFieldError('form', err.message);
      alertFail(() => null, err);
    } finally {
      actions.setSubmitting(false);
      NavigationService.navigate('Addresses');
    }
  };

  private renderExtraButtons = () => {
    const { form } = this.state;
    const { theme } = this.props;
    const { checkTrue, checkFalse } = IconCollection;

    const addMode = !form.id;
    const currentDefault = !!(form.id && form.default);
    const checkIcon = currentDefault ? checkTrue : checkFalse;
    const defaultIconColor = currentDefault
      ? theme.colors.success
      : theme.colors.primary;
    const defaultIcon: IconProps = { ...checkIcon, color: defaultIconColor };
    return (
      <Fragment>
        {!addMode && (
          <StyledButton
            label={
              currentDefault
                ? 'Default billing address'
                : 'Make default billing address'
            }
            onPress={() => Alert.alert('not yet implemented')}
            type="outline"
            disabled={addMode || currentDefault}
            icon={defaultIcon}
          />
        )}
        {!addMode && (
          <StyledDangerButton
            label={
              currentDefault
                ? 'Cannot delete default address'
                : 'Delete address'
            }
            onPress={() => Alert.alert('not yet implemented')}
            type="clear"
            disabled={addMode || currentDefault}
          />
        )}
      </Fragment>
    );
  };
}

const ThemedAddressFormScreen = withTheme(AddressFormScreen);

export { ThemedAddressFormScreen as AddressFormScreen };
