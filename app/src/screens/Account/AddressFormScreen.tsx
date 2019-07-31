import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';
import { withTheme } from 'styled-components';
import { IconProps } from 'react-native-elements';
import { Formik, FormikActions } from 'formik';
import countryList from 'country-list';
import _ from 'lodash';
import RNPickerSelect from 'react-native-picker-select';

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
import { AddressModel, AddressSchema, logError } from '../../shared';
import { alertFail, alertOk, NavigationService, Busy } from '../../utils';
import { StyleGuide } from '../../themes';
import { ShopifyRestApi } from '../../shared/ShopifyRestApi';

type FormModel = typeof AddressModel;

const InitialState = {
  form: {
    ...AddressModel,
    country: 'Philippines',
  },
};

type Props = NavigationScreenProps & ThemedComponentProps;
type State = typeof InitialState;

const countries = _.map(countryList.getNames(), c => ({
  label: c,
  value: c,
  key: c,
}));

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
    const { theme } = this.props;
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
                    placeholder="46 Osmeña St."
                    multiline
                    numberOfLines={3}
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="address2" formProps={fProps}>
                  <StyledTextInput
                    label="Barangay"
                    textContentType="streetAddressLine2"
                    placeholder="Brgy. Del Monte"
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
                <StyledTextInput
                  label="Country"
                  style={theme.TextInput.containerStyle}
                  inputComponent={
                    // tslint:disable-next-line max-classes-per-file
                    class extends Component {
                      // needed forward ref
                      public render() {
                        return (
                          <RNPickerSelect
                            textInputProps={{
                              style: theme.TextInput.inputStyle,
                            }}
                            placeholder={{ label: 'Select country' }}
                            onValueChange={value =>
                              fProps.setFieldValue('country', value)
                            }
                            items={countries}
                            value={fProps.values.country}
                          />
                        );
                      }
                    }
                  }
                />
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
    // const oldAttrs = this.state.form;
    // const newAttrs = form;
    const newForm: FormModel = { ...form };
    const addMode = !newForm.id;

    try {
      actions.setSubmitting(true);
      if (addMode) {
        await ShopifyRestApi.createAddress(newForm);
      } else {
        await ShopifyRestApi.updateAddress(newForm);
      }

      alertOk(() => null);
    } catch (err) {
      actions.setFieldError('form', err.message);
      alertFail(() => null, err);
    } finally {
      actions.setSubmitting(false);
      NavigationService.navigate('Addresses');
    }
  };

  private onMakeDefault = async <T extends FormModel>(form: T) => {
    try {
      Busy.start();
      await ShopifyRestApi.makeDefaultAddress(form);
    } catch (err) {
      logError(' ShopifyRestApi.makeDefaultAddress', err);
    } finally {
      NavigationService.navigate('Addresses');
      Busy.stop();
    }
  };

  private onDelete = async <T extends FormModel>(form: T) => {
    try {
      Busy.start();
      await ShopifyRestApi.deleteAddress(form);
    } catch (err) {
      logError(' ShopifyRestApi.deleteAddress', err);
    } finally {
      NavigationService.navigate('Addresses');
      Busy.stop();
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
            onPress={() => this.onMakeDefault(form)}
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
            onPress={() => this.onDelete(form)}
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
