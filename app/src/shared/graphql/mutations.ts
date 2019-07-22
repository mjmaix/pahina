// tslint:disable
// this is an auto generated file. This will be overwritten

export const updateShopifyCustomer = `mutation UpdateShopifyCustomer($input: ShopifyCustomerInput!) {
  updateShopifyCustomer(input: $input) {
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
export const createPahinaUser = `mutation CreatePahinaUser($input: CreatePahinaUserInput!) {
  createPahinaUser(input: $input) {
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
export const updatePahinaUser = `mutation UpdatePahinaUser($input: UpdatePahinaUserInput!) {
  updatePahinaUser(input: $input) {
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
export const deletePahinaUser = `mutation DeletePahinaUser($input: DeletePahinaUserInput!) {
  deletePahinaUser(input: $input) {
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
export const createPahinaNote = `mutation CreatePahinaNote($input: CreatePahinaNoteInput!) {
  createPahinaNote(input: $input) {
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
export const updatePahinaNote = `mutation UpdatePahinaNote($input: UpdatePahinaNoteInput!) {
  updatePahinaNote(input: $input) {
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
export const deletePahinaNote = `mutation DeletePahinaNote($input: DeletePahinaNoteInput!) {
  deletePahinaNote(input: $input) {
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
export const createPahinaCase = `mutation CreatePahinaCase($input: CreatePahinaCaseInput!) {
  createPahinaCase(input: $input) {
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
export const updatePahinaCase = `mutation UpdatePahinaCase($input: UpdatePahinaCaseInput!) {
  updatePahinaCase(input: $input) {
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
export const deletePahinaCase = `mutation DeletePahinaCase($input: DeletePahinaCaseInput!) {
  deletePahinaCase(input: $input) {
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
