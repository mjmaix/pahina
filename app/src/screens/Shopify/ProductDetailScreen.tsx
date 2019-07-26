import React, { Component, Fragment } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { withTheme, ThemedComponentProps } from 'styled-components';
import { NavigationScreenProps } from 'react-navigation';
import * as WebBrowser from 'expo-web-browser';
import _ from 'lodash';
import { formatDistance } from 'date-fns';

import styled from 'styled-components/native';

import {
  StyledScreenContainer,
  StyledScrollView,
  containerStyles,
  ThemedIcon,
  GapListItem,
  StyledButton,
} from '../../components';
import { IconSize } from '../../utils';
import { ShopifyGraphQlProduct } from '../../types';
import { PriceText } from '../../components/Product/PriceText';
import { StyleGuide } from '../../themes';
import { parseProductMetafields } from '../../api-helpers';
import { ListItem } from 'react-native-elements';

interface State {
  data?: ShopifyGraphQlProduct;
  purchased?: boolean;
}
type Props = NavigationScreenProps & ThemedComponentProps;

const initialState = {
  data: undefined,
};

const InfoHeader = styled.Text`
  font-size: 20;
  font-weight: 500;
  padding-bottom: ${StyleGuide.gap.regular};
`;
const InfoItem = styled.Text`
  font-size: 16;
  font-weight: 400;
`;
const Title = styled.Text`
  font-size: 24;
  font-weight: 600;
`;

const SectionContainer = styled.View`
  ${props => ({
    ...containerStyles.screenPad,
    ...containerStyles.white,
  })}
`;

const Gap = styled(GapListItem)`
  background-color: ${props => props.theme.colors.greyBackground};
`;

class ProductDetailScreen extends Component<Props, State> {
  public readonly state: State = initialState;
  public componentDidMount() {
    if (!this.state.data) {
      const { navigation } = this.props;
      const data = navigation.getParam('product');
      this.setState({ data });
    }
  }
  public render() {
    const { data } = this.state;
    if (!data) {
      return (
        <StyledScreenContainer>
          <ActivityIndicator />
        </StyledScreenContainer>
      );
    }

    const meta = parseProductMetafields(data);

    const caseTitle = meta.caseTitle;
    const caseCode = meta.caseCode;
    const caseDate = meta.caseDate;
    const caseLink = meta.caseLink;
    const notePromotional = meta.notePromotional;
    const authorName = meta.authorName;

    const updated = `Updated ${formatDistance(
      new Date(data.updatedAt),
      new Date(),
    )}`;
    const created = `Created ${formatDistance(
      new Date(data.createdAt),
      new Date(),
    )}`;

    return (
      <StyledScreenContainer>
        <StyledScrollView style={[containerStyles.fullWidth]}>
          <SectionContainer>
            <Title>{data.title}</Title>
          </SectionContainer>

          <Gap />

          <SectionContainer>
            <PriceText product={data} />
          </SectionContainer>

          {notePromotional && (
            <Fragment>
              <Gap />
              <SectionContainer>
                <InfoHeader>Promotional message</InfoHeader>
                <InfoItem>{notePromotional.value}</InfoItem>
              </SectionContainer>
            </Fragment>
          )}

          <Gap />

          <SectionContainer>
            <InfoHeader>Author information</InfoHeader>
            <InfoItem>{'\u2022 ' + 'Written by ' + authorName.value}</InfoItem>
            {updated !== created && <InfoItem>{'\u2022 ' + updated}</InfoItem>}
            {updated === created && <InfoItem>{'\u2022 ' + created}</InfoItem>}
          </SectionContainer>

          <Gap />

          <SectionContainer>
            <ListItem
              containerStyle={{ padding: 0 }}
              onPress={() => WebBrowser.openBrowserAsync(caseLink.value)}
              title="Official link"
              titleStyle={{ fontSize: 20, fontWeight: '500' }}
              rightIcon={
                <ThemedIcon
                  name="external-link"
                  type="font-awesome"
                  size={IconSize.SM}
                />
              }
            />
          </SectionContainer>

          <Gap />

          <SectionContainer>
            <InfoHeader>More about the decision</InfoHeader>
            <InfoItem>{'\u2022 ' + `Code - ${caseCode.value}`}</InfoItem>
            <InfoItem>{'\u2022 ' + `Date - ${caseDate.value}`}</InfoItem>
            <InfoItem>{'\u2022 ' + `Link - ${caseLink.value}`}</InfoItem>
            <InfoItem style={{ textTransform: 'capitalize' }}>
              {'\u2022 ' + `Title - ${caseTitle.value}`}
            </InfoItem>
          </SectionContainer>
        </StyledScrollView>
        <StyledButton
          label="Buy now to read"
          onPress={() => Alert.alert('not yet implemented')}
          containerStyle={[
            containerStyles.fullWidth,
            {
              padding: StyleGuide.gap.big,
            },
          ]}
        />
      </StyledScreenContainer>
    );
  }
}

const ThemedProductDetailScreen = withTheme(ProductDetailScreen);

export { ThemedProductDetailScreen as ProductDetailScreen };
