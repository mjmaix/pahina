import { ProcessingError } from '../../../shared/utils/ProcessingError';

export function getUserStoreQueryParam(image: NoteRecord) {
  if (!process.env.USER_STORE_TABLE_NAME) {
    throw new ProcessingError('USER_STORE_TABLE_NAME is empty');
  }
  const ownerId = image.authorId.S;

  const queryParam: QueryInput = {
    TableName: process.env.USER_STORE_TABLE_NAME,
    IndexName: 'ByOwnerId',
    KeyConditions: {
      ownerId: {
        AttributeValueList: [{ S: ownerId }],
        ComparisonOperator: 'EQ',
      },
    },
  };

  return queryParam;
}
