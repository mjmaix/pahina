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
    notes {
      items {
        id
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
        ownerId
        skuPrefix
        createdAt
        updatedAt
      }
      nextToken
    }
    ownedProducts {
      items {
        sku
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
      notes {
        nextToken
      }
      stores {
        nextToken
      }
      ownedProducts {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getPahinaMainStore = `query GetPahinaMainStore($id: ID!) {
  getPahinaMainStore(id: $id) {
    id
    digitalPublicationId
    digitalLocationId
  }
}
`;
export const listPahinaMainStores = `query ListPahinaMainStores(
  $filter: ModelPahinaMainStoreFilterInput
  $limit: Int
  $nextToken: String
) {
  listPahinaMainStores(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      digitalPublicationId
      digitalLocationId
    }
    nextToken
  }
}
`;
export const getPahinaUserStore = `query GetPahinaUserStore($ownerId: String!, $skuPrefix: String!) {
  getPahinaUserStore(ownerId: $ownerId, skuPrefix: $skuPrefix) {
    ownerId
    skuPrefix
    owner {
      id
      givenName
      familyName
      email
      picture
      identityId
      createdAt
      updatedAt
      notes {
        nextToken
      }
      stores {
        nextToken
      }
      ownedProducts {
        nextToken
      }
    }
    products {
      items {
        sku
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
    createdAt
    updatedAt
  }
}
`;
export const listPahinaUserStores = `query ListPahinaUserStores(
  $ownerId: String
  $skuPrefix: ModelStringKeyConditionInput
  $filter: ModelPahinaUserStoreFilterInput
  $limit: Int
  $nextToken: String
) {
  listPahinaUserStores(
    ownerId: $ownerId
    skuPrefix: $skuPrefix
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      ownerId
      skuPrefix
      owner {
        id
        givenName
        familyName
        email
        picture
        identityId
        createdAt
        updatedAt
      }
      products {
        nextToken
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getPahinaUserStoreProduct = `query GetPahinaUserStoreProduct($storeId: String!, $sku: String!) {
  getPahinaUserStoreProduct(storeId: $storeId, sku: $sku) {
    sku
    storeId
    ownerId
    owner {
      id
      givenName
      familyName
      email
      picture
      identityId
      createdAt
      updatedAt
      notes {
        nextToken
      }
      stores {
        nextToken
      }
      ownedProducts {
        nextToken
      }
    }
    store {
      ownerId
      skuPrefix
      owner {
        id
        givenName
        familyName
        email
        picture
        identityId
        createdAt
        updatedAt
      }
      products {
        nextToken
      }
      createdAt
      updatedAt
    }
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
}
`;
export const listPahinaUserStoreProducts = `query ListPahinaUserStoreProducts(
  $storeId: String
  $sku: ModelStringKeyConditionInput
  $filter: ModelPahinaUserStoreProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listPahinaUserStoreProducts(
    storeId: $storeId
    sku: $sku
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      sku
      storeId
      ownerId
      owner {
        id
        givenName
        familyName
        email
        picture
        identityId
        createdAt
        updatedAt
      }
      store {
        ownerId
        skuPrefix
        createdAt
        updatedAt
      }
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
      notes {
        nextToken
      }
      stores {
        nextToken
      }
      ownedProducts {
        nextToken
      }
    }
    case {
      id
      title
      code
      date
      link
      createdAt
      updatedAt
      notes {
        nextToken
      }
    }
    promotional
    createdAt
    updatedAt
    status
    priceLevel
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
      author {
        id
        givenName
        familyName
        email
        picture
        identityId
        createdAt
        updatedAt
      }
      case {
        id
        title
        code
        date
        link
        createdAt
        updatedAt
      }
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
`;
export const getPahinaCase = `query GetPahinaCase($id: ID!) {
  getPahinaCase(id: $id) {
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
      date
      link
      createdAt
      updatedAt
      notes {
        nextToken
      }
    }
    nextToken
  }
}
`;
