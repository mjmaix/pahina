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
    active
    notes {
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
    active
    notes {
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
    active
    notes {
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
      active
      notes {
        nextToken
      }
    }
    case {
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
    promotional
    createdAt
    updatedAt
    status
    active
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
      active
      notes {
        nextToken
      }
    }
    case {
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
    promotional
    createdAt
    updatedAt
    status
    active
    value
  }
}
`;
export const createPahinaCase = `mutation CreatePahinaCase($input: CreatePahinaCaseInput!) {
  createPahinaCase(input: $input) {
    id
    title
    code
    link
    active
    createdAt
    updatedAt
    notes {
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
}
`;
export const updatePahinaCase = `mutation UpdatePahinaCase($input: UpdatePahinaCaseInput!) {
  updatePahinaCase(input: $input) {
    id
    title
    code
    link
    active
    createdAt
    updatedAt
    notes {
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
}
`;
export const deletePahinaCase = `mutation DeletePahinaCase($input: DeletePahinaCaseInput!) {
  deletePahinaCase(input: $input) {
    id
    title
    code
    link
    active
    createdAt
    updatedAt
    notes {
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
}
`;
