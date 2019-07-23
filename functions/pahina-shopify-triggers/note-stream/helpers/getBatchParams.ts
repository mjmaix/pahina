import { ProcessingError } from '../../../shared/utils/ProcessingError';

export function getBatchParams(image: NoteRecord) {
  if (!process.env.USER_TABLE_NAME) {
    throw new ProcessingError('USER_TABLE_NAME is empty');
  }

  if (!process.env.CASE_TABLE_NAME) {
    throw new ProcessingError('CASE_TABLE_NAME is empty');
  }

  const ownerId = image.authorId.S;
  const caseId = image.caseId.S;

  return {
    RequestItems: {
      [process.env.USER_TABLE_NAME]: {
        Keys: [{ id: { S: ownerId } }],
        AttributesToGet: ['givenName', 'familyName', 'email'],
        ConsistentRead: false,
      },
      [process.env.CASE_TABLE_NAME]: {
        Keys: [{ id: { S: caseId } }],
        AttributesToGet: ['title', 'code', 'date', 'link'],
        ConsistentRead: false,
      },
    },
  } as BatchGetItemInput;
}
