import { PahinaNoteRecord, BatchGetItemInput } from '../types';

import { ProcessingError } from '../utils/ProcessingError';

export function getBatchParams(image: PahinaNoteRecord) {
  if (!process.env.USER_STORE_TABLE_NAME) {
    throw new ProcessingError('USER_STORE_TABLE_NAME is empty');
  }

  if (!process.env.USER_TABLE_NAME) {
    throw new ProcessingError('USER_TABLE_NAME is empty');
  }

  const ownerId = image.authorId.S;

  return {
    RequestItems: {
      [process.env.USER_STORE_TABLE_NAME]: {
        Keys: [{ ownerId: { S: ownerId } }, { status: { S: status } }],
        AttributesToGet: ['ownerId', 'skuPrefix'],
      },
      [process.env.USER_TABLE_NAME]: {
        Keys: [{ id: { S: ownerId } }],
        AttributesToGet: ['givenName', 'familyName', 'email'],
      },
    },
  } as BatchGetItemInput;
}
