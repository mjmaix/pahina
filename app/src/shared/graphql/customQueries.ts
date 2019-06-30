export const getPahinaUserSortedNotes = `query GetPahinaUserSortedNotes($id: ID!) {
    getPahinaUser(id: $id) {
      id
      givenName
      familyName
      email
      picture
      identityId
      createdAt
      updatedAt
      notes(sortDirection: DESC) {
        items {
          id
          promotional
          createdAt
          updatedAt
          status
          value
        }
        nextToken
      }
    }
  }
  `;
