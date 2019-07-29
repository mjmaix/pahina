// tslint:disable
// this is an auto generated file. This will be overwritten

export const getConfig = `query GetConfig {
  getConfig {
    env
    shopifyHost
    shopifyStorefrontAccessToken
  }
}
`;
export const getShopifyCustomer = `query GetShopifyCustomer($id: ID!) {
  getShopifyCustomer(id: $id) {
    id
    displayName
    firstName
    lastName
    email
    addresses {
      id
      name
      firstName
      lastName
      phone
      address1
      address2
      company
      city
      province
      provinceCode
      zip
      country
      countryCodeV2
      formatted
      formattedArea
      longitude
      latitude
      default
    }
    createdAt
    ShopifyCustomerState
    defaultAddress {
      id
      name
      firstName
      lastName
      phone
      address1
      address2
      company
      city
      province
      provinceCode
      zip
      country
      countryCodeV2
      formatted
      formattedArea
      longitude
      latitude
      default
    }
    metafield {
      id
      description
      key
      namespace
      ownerType
      value
      valueType
    }
    phone
    state
    tags
  }
}
`;
export const getPahinaUser = `query GetPahinaUser($id: ID!) {
  getPahinaUser(id: $id) {
    id
    identityId
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
export const listPahinaUsers = `query ListPahinaUsers(
  $filter: ModelPahinaUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listPahinaUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
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
export const getPahinaUserStore = `query GetPahinaUserStore($id: ID!) {
  getPahinaUserStore(id: $id) {
    id
    ownerId
    owner {
      id
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
    createdAt
    updatedAt
  }
}
`;
export const listPahinaUserStores = `query ListPahinaUserStores(
  $filter: ModelPahinaUserStoreFilterInput
  $limit: Int
  $nextToken: String
) {
  listPahinaUserStores(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      ownerId
      owner {
        id
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
export const getPahinaUserStoreProduct = `query GetPahinaUserStoreProduct($id: ID!) {
  getPahinaUserStoreProduct(id: $id) {
    id
    storeId
    ownerId
    owner {
      id
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
      id
      ownerId
      owner {
        id
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
  $filter: ModelPahinaUserStoreProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listPahinaUserStoreProducts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      storeId
      ownerId
      owner {
        id
        identityId
        createdAt
        updatedAt
      }
      store {
        id
        ownerId
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
    authorId
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
    caseId
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
        identityId
        createdAt
        updatedAt
      }
      authorId
      case {
        id
        title
        code
        date
        link
        createdAt
        updatedAt
      }
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
export const byOwnerId = `query ByOwnerId(
  $ownerId: String
  $updatedAt: ModelStringKeyConditionInput
  $filter: ModelPahinaUserStoreFilterInput
  $limit: Int
  $nextToken: String
) {
  byOwnerId(
    ownerId: $ownerId
    updatedAt: $updatedAt
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      ownerId
      owner {
        id
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
