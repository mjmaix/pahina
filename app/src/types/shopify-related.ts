import sampleProducts from '../api-helpers/sampleproducts.json';

/**
 * Shopify GraphQL
 */
export type ShopifyGraphQlProductNode = typeof sampleProducts.data.products.edges[0];
export type ShopifyGraphQlProduct = ShopifyGraphQlProductNode['node'];
export type ShopifyGraphQlVariant = ShopifyGraphQlProduct['variants']['edges'][0]['node'];

/**
 * Shopify Rest
 */
export interface ShopifyRestAddress {
  id?: string;
  address1: string;
  address2: string;
  city: string;
  first_name: string;
  last_name: string;
  phone: string;
  province: string;
  country: string;
  zip: string;
  company?: string;
  province_code?: string;
  country_code?: string;
  country_name?: string;
  default?: boolean;
}
