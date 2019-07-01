export const getPahinaUserSortedNotes = `query GetPahinaUserSortedNotes
  ($id: ID!, $notesNextToken: String) {
    getPahinaUser(id: $id) {
      id
      givenName
      familyName
      email
      picture
      identityId
      createdAt
      updatedAt
      notes(sortDirection: DESC, nextToken: $notesNextToken) {
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
