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
    active
    notes {
      nextToken
    }
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
      active
    }
    nextToken
  }
}
`;
export const getPahinaNote = `query GetPahinaNote($id: ID!) {
  getPahinaNote(id: $id) {
    id
    author {
      id
      givenName
      familyName
      email
      picture
      identityId
      createdAt
      updatedAt
      active
    }
    case {
      id
      title
      code
      link
      active
      createdAt
      updatedAt
    }
    promotional
    createdAt
    updatedAt
    status
    active
    value
  }
}
`;
export const listPahinaNotes = `query ListPahinaNotes(
  $filter: ModelPahinaNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  listPahinaNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      promotional
      createdAt
      updatedAt
      status
      active
      value
    }
    nextToken
  }
}
`;
export const getPahinaCase = `query GetPahinaCase($id: ID!) {
  getPahinaCase(id: $id) {
    id
    title
    code
    link
    active
    createdAt
    updatedAt
    notes {
      nextToken
    }
  }
}
`;
export const listPahinaCases = `query ListPahinaCases(
  $filter: ModelPahinaCaseFilterInput
  $limit: Int
  $nextToken: String
) {
  listPahinaCases(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      code
      link
      active
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
