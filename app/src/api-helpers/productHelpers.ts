import _ from 'lodash';

import { ConfigStoreInfo } from '../stores/';
import { ShopifyGraphQlVariant } from '../types';

export const getCartLink = (
  config: ConfigStoreInfo,
  variant?: ShopifyGraphQlVariant,
  quantity: number = 1,
) => {
  let link = '';
  if (config && config.data && config.data.shopifyHost && variant) {
    const { shopifyHost } = config.data;

    let { id } = variant;

    if (id && id.startsWith('gid')) {
      const strippedId = _.last(_.split(id, '/'));
      if (strippedId) {
        id = strippedId;
      }
    }
    link = `https://${shopifyHost}/cart/${id}:${quantity}`;
  }

  return link;
};
