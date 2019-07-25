import _ from 'lodash';
import { ShopifyGraphQlProduct } from '../types/shopify-related';

export const parseProductVariants = (product: ShopifyGraphQlProduct) => {
  const variants = _.keyBy(_.map(product.variants.edges, m => m.node), 'title');

  return variants;
};

export const parseProductMetafields = (product: ShopifyGraphQlProduct) => {
  const metas = _.keyBy(_.map(product.metafields.edges, m => m.node), 'key');

  return metas;
};
