import React, { Component, Fragment } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { withTheme, ThemedComponentProps } from 'styled-components';
import { NavigationScreenProps } from 'react-navigation';
import { ListItem, Text } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import _ from 'lodash';
import { formatDistance } from 'date-fns';

import {
  StyledScreenContainer,
  StyledScrollView,
  containerStyles,
  ThemedIcon,
  GapListItem,
} from '../../components';
import { IconSize } from '../../utils';
import { ShopifyGraphQlProduct } from '../../types';
import { PriceText } from '../../components/Product/PriceText';
import { StyleGuide } from '../../themes';
import { parseProductMetafields } from '../../api-helpers';

interface State {
  data?: ShopifyGraphQlProduct;
}
type Props = NavigationScreenProps & ThemedComponentProps;

const initialState = {
  data: undefined,
};

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

    const {
      theme: { colors },
    } = this.props;

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

    const styles = StyleSheet.create({
      title: { fontSize: 24, fontWeight: 'bold' },
      infoheader: {
        fontSize: 20,
        fontWeight: '500',
        paddingBottom: StyleGuide.gap.regular,
      },
      infoitem: { fontSize: 16, fontWeight: '400' },
      sectionContainer: {
        ...containerStyles.screenPad,
        ...containerStyles.white,
      },
    });

    const Gap = (
      <GapListItem
        containerStyle={{ backgroundColor: colors.greyBackground }}
      />
    );
    return (
      <StyledScreenContainer>
        <StyledScrollView style={[containerStyles.fullWidth]}>
          <View style={styles.sectionContainer}>
            <Text style={styles.title}>{data.title}</Text>
          </View>

          {Gap}

          <View style={styles.sectionContainer}>
            <PriceText product={data} />
          </View>

          {notePromotional && (
            <Fragment>
              {Gap}

              <View style={styles.sectionContainer}>
                <Text style={styles.infoheader}>Promotional message</Text>
                <Text style={styles.infoitem}>{notePromotional.value}</Text>
              </View>
            </Fragment>
          )}

          {Gap}

          <View style={styles.sectionContainer}>
            <Text style={styles.infoheader}>Author information</Text>
            <Text style={styles.infoitem}>
              {'\u2022 ' + 'Written by ' + authorName.value}
            </Text>
            {updated !== created && (
              <Text style={styles.infoitem}>{'\u2022 ' + updated}</Text>
            )}
            {updated === created && (
              <Text style={styles.infoitem}>{'\u2022 ' + created}</Text>
            )}
          </View>

          {Gap}

          <View style={styles.sectionContainer}>
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
          </View>

          {Gap}

          <View style={styles.sectionContainer}>
            <Text style={styles.infoheader}>More about the decision</Text>
            <Text style={styles.infoitem}>
              {'\u2022 ' + `Code - ${caseCode.value}`}
            </Text>
            <Text style={styles.infoitem}>
              {'\u2022 ' + `Date - ${caseDate.value}`}
            </Text>
            <Text style={styles.infoitem}>
              {'\u2022 ' + `Link - ${caseLink.value}`}
            </Text>
            <Text style={[styles.infoitem, { textTransform: 'capitalize' }]}>
              {'\u2022 ' + `Title - ${caseTitle.value}`}
            </Text>
          </View>
        </StyledScrollView>
      </StyledScreenContainer>
    );
  }
}

const ThemedProductDetailScreen = withTheme(ProductDetailScreen);

export { ThemedProductDetailScreen as ProductDetailScreen };
