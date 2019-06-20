import { Formik, FormikActions, FormikProps } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Linking, Platform } from 'react-native';
import { Image } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';

import { CodeInput, Header, formStyles } from '../../components';
import {
  CodeRequiredModel,
  CodeSchema,
  ProfileModel,
  handleGetCurrentUserAttrs,
  handleSetupMfaTotp,
  handleSignOut,
  handleVerifyMfaTotp,
} from '../../stores';
import {
  FormikInputInjector,
  MemoFormikFormErrorText,
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../components';

import {
  Busy,
  NavigationService,
  alertFail,
  alertOk,
  generateTotpLink,
  BRAND_NAME,
} from '../../utils';

interface MfaTotpProps {}
type FormModel = typeof CodeRequiredModel;

const { width } = Dimensions.get('window');
const qrCodeSize = width * 0.8;

const onPressSubmit = async <T extends FormModel>(
  form: T,
  actions: FormikActions<T>,
) => {
  try {
    Busy.start();
    await handleVerifyMfaTotp(form);
    alertOk(
      async () => {
        await handleSignOut();
        NavigationService.navigate('AuthLoading');
      },
      { message: 'Please sign in again' },
    );
  } catch (err) {
    actions.setFieldError('form', err.message);
    alertFail(() => null, err);
  } finally {
    actions.setSubmitting(false);
    Busy.stop();
  }
};

export const MfaTotpScreen = (props: MfaTotpProps) => {
  const [code, setCode] = useState('');
  const [userAttrs, setUserAttrs] = useState<typeof ProfileModel>(ProfileModel);

  useEffect(() => {
    handleGetCurrentUserAttrs().then(setUserAttrs);
  }, []);

  useEffect(() => {
    handleSetupMfaTotp().then(setCode);
  }, []);

  const urlLink = generateTotpLink(userAttrs.email, code, BRAND_NAME);

  return (
    <StyledScreenContainer>
      <Header
        title={'Complete app MFA setup'}
        message={`${Platform.select({
          ios: 'Scan QR code using camera.',
          android: 'Scan QR code with your 2FA app.',
        })}`}
      />

      <Formik<FormModel>
        enableReinitialize
        initialValues={CodeRequiredModel}
        validationSchema={CodeSchema}
        onSubmit={onPressSubmit}
      >
        {fProps => {
          return (
            <StyledFormContainer>
              <StyledFormRow style={formStyles.formItemImage}>
                <Image
                  PlaceholderContent={
                    !urlLink ? <ActivityIndicator /> : undefined
                  }
                  source={{ uri: 'x' }}
                  ImageComponent={
                    class extends React.Component {
                      public render() {
                        return <QRCode size={qrCodeSize} value={urlLink} />;
                      }
                    }
                  }
                />
              </StyledFormRow>
              <StyledFormRow>
                <StyledButton
                  onPress={() => Linking.openURL(urlLink)}
                  label={'Click to save to a 2FA app'}
                  type="outline"
                />
              </StyledFormRow>
              <StyledFormRow>
                <FormikInputInjector dataKey="code" formProps={fProps}>
                  <StyledTextInput placeholder="MFA code" as={CodeInput} />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <MemoFormikFormErrorText {...fProps} />
              </StyledFormRow>
              <StyledFormRow>
                <StyledButton
                  onPress={fProps.handleSubmit}
                  label={'Activate'}
                />
              </StyledFormRow>
            </StyledFormContainer>
          );
        }}
      </Formik>
    </StyledScreenContainer>
  );
};
