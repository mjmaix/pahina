// tslint:disable
// this is an auto generated file. This will be overwritten

export const createPahinaUser = `mutation CreatePahinaUser($input: CreatePahinaUserInput!) {
  createPahinaUser(input: $input) {
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
        id
        skuPrefix
      }
      nextToken
    }
  }
}
`;
export const updatePahinaUser = `mutation UpdatePahinaUser($input: UpdatePahinaUserInput!) {
  updatePahinaUser(input: $input) {
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
        id
        skuPrefix
      }
      nextToken
    }
  }
}
`;
export const deletePahinaUser = `mutation DeletePahinaUser($input: DeletePahinaUserInput!) {
  deletePahinaUser(input: $input) {
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
        id
        skuPrefix
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
export const updatePahinaNote = `mutation UpdatePahinaNote($input: UpdatePahinaNoteInput!) {
  updatePahinaNote(input: $input) {
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
export const deletePahinaNote = `mutation DeletePahinaNote($input: DeletePahinaNoteInput!) {
  deletePahinaNote(input: $input) {
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
