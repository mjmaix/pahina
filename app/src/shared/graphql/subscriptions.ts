// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreatePahinaUser = `subscription OnCreatePahinaUser {
  onCreatePahinaUser {
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
}
`;
export const onUpdatePahinaUser = `subscription OnUpdatePahinaUser {
  onUpdatePahinaUser {
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
}
`;
export const onDeletePahinaUser = `subscription OnDeletePahinaUser {
  onDeletePahinaUser {
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
}
`;
export const onCreatePahinaNote = `subscription OnCreatePahinaNote {
  onCreatePahinaNote {
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
    }
    case {
      id
      title
      code
      link
      active
      createdAt
      updatedAt
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
export const onUpdatePahinaNote = `subscription OnUpdatePahinaNote {
  onUpdatePahinaNote {
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
    }
    case {
      id
      title
      code
      link
      active
      createdAt
      updatedAt
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
export const onCreatePahinaCase = `subscription OnCreatePahinaCase {
  onCreatePahinaCase {
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
}
`;
export const onUpdatePahinaCase = `subscription OnUpdatePahinaCase {
  onUpdatePahinaCase {
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
}
`;
export const onDeletePahinaCase = `subscription OnDeletePahinaCase {
  onDeletePahinaCase {
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
}
`;
