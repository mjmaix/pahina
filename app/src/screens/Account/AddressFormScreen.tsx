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
} from '../../components';
import { AddressModel, AddressSchema } from '../../shared';
import { Formik, FormikActions } from 'formik';
import { alertFail, alertOk, NavigationService } from '../../utils';
import { StyleGuide } from '../../themes';
import { View, Alert } from 'react-native';

interface FormModel {
  address1: string;
  address2: string;
  city: string;
  first_name: string;
  last_name: string;
  phone: string;
  province: string;
  country: string;
  zip: string;
}

const InitialState = { form: AddressModel };

interface Props {}
type State = typeof InitialState;

export class AddressFormScreen extends Component<Props, State> {
  public readonly state = InitialState;
  public render() {
    return (
      <StyledScrollView>
        <StyledScreenContainer>{this.renderForm()}</StyledScreenContainer>
      </StyledScrollView>
    );
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
                  // borderWidth: 1,
                  // borderColor: 'blue',
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
    return (
      <Fragment>
        <StyledDangerButton
          label="Delete address"
          onPress={() => Alert.alert('not yet implemented')}
          type="clear"
        />
      </Fragment>
    );
  };
}
