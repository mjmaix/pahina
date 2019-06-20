import { Formik, FormikActions } from 'formik';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { CodeInput, Header } from '../../components';
import {
  FormikInputInjector,
  MemoFormikFormErrorText,
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../components';
import { ChallengeModel, ChallengeSchema } from '../../stores';

interface OwnProps<T> {
  title?: string;
  message?: string;
  placeholder: string;
  onSubmit: (values: T, formikActions: FormikActions<T>) => Promise<any> | void;
  initialValues?: FormModel;
  disableFields?: [keyof FormModel];
}

type FormModel = typeof ChallengeModel;
type Props<T> = OwnProps<T> & Partial<NavigationScreenProps>;

class BaseChallengeScreen<T extends FormModel> extends Component<Props<T>> {
  private isFieldDisabled = (fieldName: keyof FormModel) => {
    const { disableFields } = this.props;
    if (!disableFields) {
      return false;
    }
    return disableFields.includes(fieldName);
  };

  public render() {
    const { title, message, placeholder, initialValues } = this.props;
    const isEmailDisabled = this.isFieldDisabled('email');
    return (
      <StyledScreenContainer>
        <Header title={title} message={message} />
        <Formik<T>
          enableReinitialize
          initialValues={{ ...(ChallengeModel as T), ...initialValues }}
          validationSchema={ChallengeSchema}
          onSubmit={(values, actions) => {
            this.props.onSubmit(values, actions);
          }}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                <StyledFormRow>
                  <FormikInputInjector dataKey="email" formProps={fProps}>
                    <StyledTextInput editable={isEmailDisabled} />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputInjector dataKey="code" formProps={fProps}>
                    <StyledTextInput placeholder={placeholder} as={CodeInput} />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <MemoFormikFormErrorText {...fProps} />
                </StyledFormRow>

                <StyledFormRow>
                  <StyledButton
                    onPress={fProps.handleSubmit}
                    label={'Submit'}
                  />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }
}

export { BaseChallengeScreen };
