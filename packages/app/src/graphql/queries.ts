// tslint:disable
// this is an auto generated file. This will be overwritten

export const getPahinaUser = `query GetPahinaUser($id: ID!) {
  getPahinaUser(id: $id) {
    id
    givenName
    familyName
    email
    picture
    identityId
    createdAt
    updatedAt
  }
}
`;
export const listPahinaUsers = `query ListPahinaUsers(
  $filter: ModelPahinaUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listPahinaUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      givenName
      familyName
      email
      picture
      identityId
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
