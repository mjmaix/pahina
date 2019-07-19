export const getPahinaUserSortedNotes = `query GetPahinaUserSortedNotes($id: ID!, $notesNextToken: String) {
  getPahinaUser(id: $id) {
    id
    identityId
    createdAt
    updatedAt
    notes(sortDirection: DESC, nextToken: $notesNextToken) {
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
    stores {
      items {
        id
        ownerId
        createdAt
        updatedAt
      }
      nextToken
    }
    ownedProducts {
      items {
        id
        storeId
        ownerId
        shopifyProductId
        shopifyShopId
        onlineStoreUrl
        onlineStorePreviewUrl
        handle
        status
        rawResponse
        createdAt
        updatedAt
        digitalSignature
      }
      nextToken
    }
  }
}
`;
