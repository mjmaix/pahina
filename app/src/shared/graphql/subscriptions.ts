// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreatePahinaCase = `subscription OnCreatePahinaCase {
  onCreatePahinaCase {
    id
    title
    code
    date
    link
    createdAt
    updatedAt
    notes {
      items {
        id
        authorId
        caseId
        promotional
        createdAt
        updatedAt
        status
        priceLevel
        value
      }
      nextToken
    }
  }
}
`;
