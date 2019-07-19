// tslint:disable
// this is an auto generated file. This will be overwritten

export const getShopifyStorefrontConfig = `query GetShopifyStorefrontConfig {
  getShopifyStorefrontConfig {
    accessToken
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
    shopifyCustomerId
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
      shopifyCustomerId
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
      shopifyCustomerId
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
        givenName
        familyName
        email
        picture
        identityId
        createdAt
        updatedAt
        shopifyCustomerId
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
      shopifyCustomerId
    }
    store {
      id
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
        shopifyCustomerId
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
        givenName
        familyName
        email
        picture
        identityId
        createdAt
        updatedAt
        shopifyCustomerId
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
      shopifyCustomerId
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
        givenName
        familyName
        email
        picture
        identityId
        createdAt
        updatedAt
        shopifyCustomerId
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
        givenName
        familyName
        email
        picture
        identityId
        createdAt
        updatedAt
        shopifyCustomerId
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
