import React, { Component } from 'react';
import _ from 'lodash';
import { Text, Card, CardProps } from 'react-native-elements';

import data from '../../api-helpers/sampleproducts.json';
import {
  FlatList,
  ListRenderItem,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { withTheme, ThemedComponentProps } from 'styled-components';
import { NavigationScreenProps } from 'react-navigation';

import { NavigationService } from '../../utils';
import { StyleGuide } from '../../themes';
import { PriceText } from '../../components/Product';
import { parseProductMetafields } from '../../api-helpers';
import { containerStyles } from '../../components';
import {
  ShopifyGraphQlProduct,
  ShopifyGraphQlProductNode,
} from '../../types/index.js';

type Props = NavigationScreenProps & ThemedComponentProps;
type State = any;

class ProductsScreen extends Component<Props, State> {
  public render() {
    const products = data.data.products.edges;
    return (
      <FlatList<ShopifyGraphQlProductNode>
        style={containerStyles.darken}
        keyExtractor={(item: ShopifyGraphQlProductNode, i: number) =>
          (item.node.id || i).toString()
        }
        data={products}
        renderItem={this.renderItem}
        numColumns={1}
      />
    );
  }

  private renderItem: ListRenderItem<ShopifyGraphQlProductNode> = ({
    item,
    index,
  }) => {
    const {
      theme: { colors },
    } = this.props;
    const product: ShopifyGraphQlProduct = item.node;
    const meta = parseProductMetafields(product);
    const caseTitle = meta.caseTitle;

    const cleanData: CardProps = {
      title: `${product.title}`,
      titleStyle: {
        color: colors.primarylight,
      },
      containerStyle: {
        shadowColor: colors.primarylight,
        borderWidth: 0,
      },
      dividerStyle: {
        backgroundColor: colors.primarylight,
      },
    };
    return (
      <TouchableWithoutFeedback
        onPress={() => NavigationService.navigate('Product', { product })}
      >
        <Card key={`${product.id}`} {...cleanData}>
          <View>
            <View
              style={{
                paddingBottom: StyleGuide.gap.regular,
                alignItems: 'center',
              }}
            >
              <PriceText product={product} />
            </View>
            <View>
              <Text
                style={{
                  color: colors.grey1,
                  textTransform: 'capitalize',
                }}
              >
                {caseTitle.value}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  };
}

const ThemedProductsScreen = withTheme(ProductsScreen);

export { ThemedProductsScreen as ProductsScreen };
