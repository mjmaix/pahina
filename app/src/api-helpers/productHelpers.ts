import _ from 'lodash';

import { ConfigStoreInfo } from '../stores/';
import { ShopifyGraphQlVariant, ShopifyRestAddress } from '../types';

export const getCartLink = (
  config: ConfigStoreInfo,
  variant?: ShopifyGraphQlVariant,
  billingAddress?: ShopifyRestAddress,
  email?: string,
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
    link = `https://${shopifyHost}/cart/${id}:${quantity}?1=1`;
  }

  if (billingAddress) {
    const {
      first_name,
      last_name,
      address1,
      address2,
      city,
      zip,
      country,
    } = billingAddress;

    link += `&checkout[billing_address][first_name]=${first_name}`;
    link += `&checkout[billing_address][last_name]=${last_name}`;
    link += `&checkout[billing_address][address1]=${address1}`;
    link += `&checkout[billing_address][address2]=${address2}`;
    link += `&checkout[billing_address][city]=${city}`;
    link += `&checkout[billing_address][zip]=${zip}`;
    link += `&checkout[billing_address][country]=${country}`;
  }
  if (email) {
    link += `&checkout[email]=${email}`;
  }

  return encodeURI(link);
};
