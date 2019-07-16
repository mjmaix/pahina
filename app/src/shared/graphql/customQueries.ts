export const getPahinaUserSortedNotes = `query GetPahinaUserSortedNotes($id: ID!, $notesNextToken: String) {
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
        authorId
        caseId
        promotional
        createdAt
        updatedAt
        status
        priceLevel
        value
        caseTitle
        caseCode
        caseDate
        caseLink
      }
      nextToken
    }
    stores {
      items {
        ownerId
        skuPrefix
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
