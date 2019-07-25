import React, { Component } from 'react';
import _ from 'lodash';
import { Text, Card, CardProps } from 'react-native-elements';
import { containerStyles, textStyles } from '../../components';

import data from './sampleproducts.json';
import {
  FlatList,
  ListRenderItem,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { withTheme, ThemedComponentProps } from 'styled-components';
import { NavigationScreenProps } from 'react-navigation';
import { ShopifyGraphQlProductNode, ShopifyGraphQlProduct } from './types';
import { NavigationService } from '../../utils';
import { StyleGuide } from '../../themes';

// TODO: create product type

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
    const meta = _.keyBy(_.map(product.metafields.edges, m => m.node), 'key');
    const caseTitle = meta.caseTitle;
    const caseCode = meta.caseCode;
    const caseDate = meta.caseDate;
    const caseLink = meta.caseLink;
    const notePromotional = meta.notePromotional;

    const variants = _.keyBy(
      _.map(product.variants.edges, m => m.node),
      'title',
    );

    const Free = variants.Free;
    const isFree = Number(Free.inventoryQuantity) > 0;
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
              <Text style={textStyles.price}>
                {isFree && (
                  <Text>
                    <Text style={{ color: colors.primarydark }}>{`FREE `}</Text>
                    <Text
                      style={{
                        ...textStyles.quantity,
                        color: colors.grey2,
                      }}
                    >{`${Free.inventoryQuantity} pc(s) `}</Text>
                  </Text>
                )}
                <Text
                  style={[
                    { color: colors.primarydark },
                    isFree && textStyles.quantity,
                    isFree && {
                      textDecorationLine: 'line-through',
                      color: colors.grey2,
                    },
                  ]}
                >
                  {`₱ ${variants.Free.compareAtPrice}`}
                </Text>
              </Text>
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
