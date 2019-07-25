import sampleAddresses from './sampleaddresses.json';
import sampleProducts from './sampleproducts.json';
/**
 * Shopify Rest
 */

export type ShopifyRestAddress = typeof sampleAddresses['addresses'][0];

/**
 * Shopify GraphQL
 */
export type ShopifyGraphQlProductNode = typeof sampleProducts.data.products.edges[0];
export type ShopifyGraphQlProduct = ShopifyGraphQlProductNode['node'];
