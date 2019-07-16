import {
  PutItemInput,
  AttributeValue,
  PahinaStoreProductStatus,
  ShopifyPostProductResponse,
  PahinaUserStoreProductRecord,
} from '../types';
import { ProcessingError } from '../utils/ProcessingError';
import { utcNow } from '../utils/simpleUtils';

interface JsonResponse {
  body: any;
  headers: any;
}

export async function getUpdateInfoFromShopifyProductResponse(
  product: PahinaUserStoreProductRecord,
  { body, headers }: JsonResponse,
) {
  if (!process.env.USER_STORE_PRODUCT_TABLE_NAME) {
    throw new ProcessingError('USER_STORE_PRODUCT_TABLE_NAME is empty ');
  }

  const { product: postProduct } = JSON.parse(
    body,
  ) as ShopifyPostProductResponse;

  const handle = { S: postProduct.handle } as AttributeValue;
  const shopifyProductId = { S: postProduct.id.toString() } as AttributeValue;
  const shopifyShopId = { S: headers['X-ShopId'] } as AttributeValue;
  const status = { S: PahinaStoreProductStatus.CREATED } as AttributeValue;
  const updatedAt = { S: utcNow() } as AttributeValue;
  const id = product.id;

  return {
    TableName: process.env.USER_STORE_PRODUCT_TABLE_NAME,
    Item: {
      id,
      shopifyProductId,
      shopifyShopId,
      handle,
      status,
      updatedAt,
    },
  } as PutItemInput;
}
