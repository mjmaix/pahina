import { StreamRecord } from 'aws-lambda';

export const makeInsertGql = (Record: StreamRecord) => {
  console.log('makeInsertGql');
  return `
    mutation {
      createProduct (
        input: { }
      ) {
        id
      }
    }
  `;
};
