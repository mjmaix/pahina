import sampleAddresses from '../api-helpers/sampleaddresses.json';
import sampleProducts from '../api-helpers/sampleproducts.json';
/**
 * Shopify Rest
 */

export type ShopifyRestAddress = typeof sampleAddresses['addresses'][0];

/**
 * Shopify GraphQL
 */
export type ShopifyGraphQlProductNode = typeof sampleProducts.data.products.edges[0];
export type ShopifyGraphQlProduct = ShopifyGraphQlProductNode['node'];
export type ShopifyGraphQlVariant = ShopifyGraphQlProduct['variants']['edges'][0]['node'];
