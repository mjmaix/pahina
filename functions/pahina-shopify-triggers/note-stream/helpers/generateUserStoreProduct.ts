import { ProcessingError } from '../utils/ProcessingError';
import { isoNow } from '../utils/simpleUtils';
import { PahinaStoreProductStatus } from './constants';
import uuid from 'uuid';

/**
 *
 * @param store
 * @param image
 * @param digitalSig Used on webhook validation
 */
export function generateUserStoreProduct(
  store: PahinaStoreRecord,
  image: NoteRecord,
) {
  if (!process.env.USER_STORE_PRODUCT_TABLE_NAME) {
    throw new ProcessingError('USER_STORE_PRODUCT_TABLE_NAME is empty ');
  }
  const id = { S: uuid().toString() };
  const ownerId = image['pahinaNoteAuthorId'] as AttributeValue;
  const storeId = store.id;
  const status = { S: PahinaStoreProductStatus.CREATED } as AttributeValue;
  const createdAt = { S: isoNow() } as AttributeValue;
  const updatedAt = { S: isoNow() } as AttributeValue;
  const __typename = { S: 'PahinaUserStoreProduct' } as AttributeValue;

  return {
    TableName: process.env.USER_STORE_PRODUCT_TABLE_NAME,
    Item: {
      id,
      ownerId,
      storeId,
      status,
      updatedAt,
      createdAt,
      __typename,
    },
  } as PutItemInput;
}
