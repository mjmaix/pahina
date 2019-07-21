import { ProcessingError } from '../../shared/utils/ProcessingError';
import { isoNow, pretty } from '../../shared/utils/simpleUtils';

import { PahinaStoreProductStatus } from './constants';
import { AttributeValueUpdate } from 'aws-sdk/clients/dynamodb';

interface ShopifyPostResponse {
  body: ShopifyPostProductResponse;
  headers: any;
}

export async function getProductUpdateParam(
  product: ProductRecord,
  { body, headers }: ShopifyPostResponse,
) {
  if (!process.env.USER_STORE_PRODUCT_TABLE_NAME) {
    throw new ProcessingError('USER_STORE_PRODUCT_TABLE_NAME is empty ');
  }

  const { product: postProduct } = body;

  const handle = {
    Action: 'PUT',
    Value: { S: postProduct.handle },
  } as AttributeValueUpdate;
  const shopifyProductId = {
    Action: 'PUT',
    Value: { S: postProduct.id.toString() },
  } as AttributeValueUpdate;
  const shopifyShopId = {
    Action: 'PUT',
    Value: { S: headers['x-shopid'][0] },
  } as AttributeValueUpdate;
  const status = {
    Action: 'PUT',
    Value: { S: PahinaStoreProductStatus.CREATED },
  } as AttributeValueUpdate;
  const updatedAt = {
    Action: 'PUT',
    Value: { S: isoNow() },
  } as AttributeValueUpdate;

  const id = product.id;

  const obj = {
    TableName: process.env.USER_STORE_PRODUCT_TABLE_NAME,
    Key: { id },
    AttributeUpdates: {
      shopifyProductId,
      shopifyShopId,
      handle,
      status,
      updatedAt,
    },
    ReturnValues: 'NONE',
  } as UpdateItemInput;

  console.log(`[INFO] Update Product Info`, pretty(obj));

  return obj;
}
