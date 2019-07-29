import _ from 'lodash';
import {
  ShopifyGraphQlProduct,
  ShopifyGraphQlVariant,
} from '../types/shopify-related';

interface VariantNode {
  node: ShopifyGraphQlVariant;
}
type ParseProductVariant = (
  product: ShopifyGraphQlProduct,
) => { [k: string]: ShopifyGraphQlVariant };

export const parseProductVariants: ParseProductVariant = (
  product: ShopifyGraphQlProduct,
) => {
  const edges: VariantNode[] = product.variants.edges;
  const variantsList = _.map<VariantNode, ShopifyGraphQlVariant>(
    edges,
    (m: VariantNode) => m.node,
  );
  const variants = _.keyBy<ShopifyGraphQlVariant>(variantsList, 'title');

  return variants;
};

export const parseProductMetafields = (product: ShopifyGraphQlProduct) => {
  const metas = _.keyBy(_.map(product.metafields.edges, m => m.node), 'key');

  return metas;
};
