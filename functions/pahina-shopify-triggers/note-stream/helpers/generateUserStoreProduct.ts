import {
  PutItemInput,
  PahinaStoreRecord,
  PahinaNoteRecord,
  AttributeValue,
  PahinaStoreProductStatus,
} from '../types';
import { ProcessingError } from '../utils/ProcessingError';
import { isoNow } from '../utils/simpleUtils';

/**
 *
 * @param store
 * @param image
 * @param digitalSig Used on webhook validation
 */
export function generateUserStoreProduct(
  store: PahinaStoreRecord,
  image: PahinaNoteRecord,
) {
  if (!process.env.USER_STORE_PRODUCT_TABLE_NAME) {
    throw new ProcessingError('USER_STORE_PRODUCT_TABLE_NAME is empty ');
  }

  const ownerId = image['pahinaNoteAuthorId'] as AttributeValue;
  const storeId = store.id;
  const status = { S: PahinaStoreProductStatus.CREATED } as AttributeValue;
  const createdAt = { S: isoNow() } as AttributeValue;
  const updatedAt = { S: isoNow() } as AttributeValue;
  const __typename = { S: 'PahinaUserStoreProduct' } as AttributeValue;

  return {
    TableName: process.env.USER_STORE_PRODUCT_TABLE_NAME,
    Item: {
      ownerId,
      storeId,
      status,
      updatedAt,
      createdAt,
      __typename,
    },
  } as PutItemInput;
}
