/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreatePahinaUserInput = {
  id?: string | null;
  givenName: string;
  familyName: string;
  email: string;
  picture?: string | null;
  identityId?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  active?: boolean | null;
};

export enum PahinaNoteStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  EDITED_UNPUBLISHED = 'EDITED_UNPUBLISHED',
  UNLISTED = 'UNLISTED',
}

export type UpdatePahinaUserInput = {
  id: string;
  givenName?: string | null;
  familyName?: string | null;
  email?: string | null;
  picture?: string | null;
  identityId?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  active?: boolean | null;
};

export type DeletePahinaUserInput = {
  id?: string | null;
};

export type CreatePahinaNoteInput = {
  id?: string | null;
  promotional?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  status: PahinaNoteStatus;
  active?: boolean | null;
  value?: string | null;
  pahinaNoteAuthorId?: string | null;
  pahinaNoteCaseId?: string | null;
};

export type UpdatePahinaNoteInput = {
  id: string;
  promotional?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  status?: PahinaNoteStatus | null;
  active?: boolean | null;
  value?: string | null;
  pahinaNoteAuthorId?: string | null;
  pahinaNoteCaseId?: string | null;
};

export type CreatePahinaCaseInput = {
  id?: string | null;
  title: string;
  code: string;
  link?: string | null;
  active?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type UpdatePahinaCaseInput = {
  id: string;
  title?: string | null;
  code?: string | null;
  link?: string | null;
  active?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type DeletePahinaCaseInput = {
  id?: string | null;
};

export type ModelPahinaUserFilterInput = {
  id?: ModelIDFilterInput | null;
  givenName?: ModelStringFilterInput | null;
  familyName?: ModelStringFilterInput | null;
  email?: ModelStringFilterInput | null;
  picture?: ModelStringFilterInput | null;
  identityId?: ModelStringFilterInput | null;
  createdAt?: ModelStringFilterInput | null;
  updatedAt?: ModelStringFilterInput | null;
  active?: ModelBooleanFilterInput | null;
  and?: Array<ModelPahinaUserFilterInput | null> | null;
  or?: Array<ModelPahinaUserFilterInput | null> | null;
  not?: ModelPahinaUserFilterInput | null;
};

export type ModelIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelBooleanFilterInput = {
  ne?: boolean | null;
  eq?: boolean | null;
};

export type ModelPahinaNoteFilterInput = {
  id?: ModelIDFilterInput | null;
  promotional?: ModelStringFilterInput | null;
  createdAt?: ModelStringFilterInput | null;
  updatedAt?: ModelStringFilterInput | null;
  status?: ModelPahinaNoteStatusFilterInput | null;
  active?: ModelBooleanFilterInput | null;
  value?: ModelStringFilterInput | null;
  and?: Array<ModelPahinaNoteFilterInput | null> | null;
  or?: Array<ModelPahinaNoteFilterInput | null> | null;
  not?: ModelPahinaNoteFilterInput | null;
};

export type ModelPahinaNoteStatusFilterInput = {
  eq?: PahinaNoteStatus | null;
  ne?: PahinaNoteStatus | null;
};

export type ModelPahinaCaseFilterInput = {
  id?: ModelIDFilterInput | null;
  title?: ModelStringFilterInput | null;
  code?: ModelStringFilterInput | null;
  link?: ModelStringFilterInput | null;
  active?: ModelBooleanFilterInput | null;
  createdAt?: ModelStringFilterInput | null;
  updatedAt?: ModelStringFilterInput | null;
  and?: Array<ModelPahinaCaseFilterInput | null> | null;
  or?: Array<ModelPahinaCaseFilterInput | null> | null;
  not?: ModelPahinaCaseFilterInput | null;
};

export type CreatePahinaUserMutationVariables = {
  input: CreatePahinaUserInput;
};

export type CreatePahinaUserMutation = {
  createPahinaUser: {
    __typename: 'PahinaUser';
    id: string;
    givenName: string;
    familyName: string;
    email: string;
    picture: string | null;
    identityId: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    active: boolean | null;
    notes: {
      __typename: 'ModelPahinaNoteConnection';
      items: Array<{
        __typename: 'PahinaNote';
        id: string;
        promotional: string | null;
        createdAt: string | null;
        updatedAt: string | null;
        status: PahinaNoteStatus;
        active: boolean | null;
        value: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type UpdatePahinaUserMutationVariables = {
  input: UpdatePahinaUserInput;
};

export type UpdatePahinaUserMutation = {
  updatePahinaUser: {
    __typename: 'PahinaUser';
    id: string;
    givenName: string;
    familyName: string;
    email: string;
    picture: string | null;
    identityId: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    active: boolean | null;
    notes: {
      __typename: 'ModelPahinaNoteConnection';
      items: Array<{
        __typename: 'PahinaNote';
        id: string;
        promotional: string | null;
        createdAt: string | null;
        updatedAt: string | null;
        status: PahinaNoteStatus;
        active: boolean | null;
        value: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type DeletePahinaUserMutationVariables = {
  input: DeletePahinaUserInput;
};

export type DeletePahinaUserMutation = {
  deletePahinaUser: {
    __typename: 'PahinaUser';
    id: string;
    givenName: string;
    familyName: string;
    email: string;
    picture: string | null;
    identityId: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    active: boolean | null;
    notes: {
      __typename: 'ModelPahinaNoteConnection';
      items: Array<{
        __typename: 'PahinaNote';
        id: string;
        promotional: string | null;
        createdAt: string | null;
        updatedAt: string | null;
        status: PahinaNoteStatus;
        active: boolean | null;
        value: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type CreatePahinaNoteMutationVariables = {
  input: CreatePahinaNoteInput;
};

export type CreatePahinaNoteMutation = {
  createPahinaNote: {
    __typename: 'PahinaNote';
    id: string;
    author: {
      __typename: 'PahinaUser';
      id: string;
      givenName: string;
      familyName: string;
      email: string;
      picture: string | null;
      identityId: string | null;
      createdAt: string | null;
      updatedAt: string | null;
      active: boolean | null;
      notes: {
        __typename: 'ModelPahinaNoteConnection';
        nextToken: string | null;
      } | null;
    } | null;
    case: {
      __typename: 'PahinaCase';
      id: string;
      title: string;
      code: string;
      link: string | null;
      active: boolean | null;
      createdAt: string | null;
      updatedAt: string | null;
      notes: {
        __typename: 'ModelPahinaNoteConnection';
        nextToken: string | null;
      } | null;
    } | null;
    promotional: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    status: PahinaNoteStatus;
    active: boolean | null;
    value: string | null;
  } | null;
};

export type UpdatePahinaNoteMutationVariables = {
  input: UpdatePahinaNoteInput;
};

export type UpdatePahinaNoteMutation = {
  updatePahinaNote: {
    __typename: 'PahinaNote';
    id: string;
    author: {
      __typename: 'PahinaUser';
      id: string;
      givenName: string;
      familyName: string;
      email: string;
      picture: string | null;
      identityId: string | null;
      createdAt: string | null;
      updatedAt: string | null;
      active: boolean | null;
      notes: {
        __typename: 'ModelPahinaNoteConnection';
        nextToken: string | null;
      } | null;
    } | null;
    case: {
      __typename: 'PahinaCase';
      id: string;
      title: string;
      code: string;
      link: string | null;
      active: boolean | null;
      createdAt: string | null;
      updatedAt: string | null;
      notes: {
        __typename: 'ModelPahinaNoteConnection';
        nextToken: string | null;
      } | null;
    } | null;
    promotional: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    status: PahinaNoteStatus;
    active: boolean | null;
    value: string | null;
  } | null;
};

export type CreatePahinaCaseMutationVariables = {
  input: CreatePahinaCaseInput;
};

export type CreatePahinaCaseMutation = {
  createPahinaCase: {
    __typename: 'PahinaCase';
    id: string;
    title: string;
    code: string;
    link: string | null;
    active: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
    notes: {
      __typename: 'ModelPahinaNoteConnection';
      items: Array<{
        __typename: 'PahinaNote';
        id: string;
        promotional: string | null;
        createdAt: string | null;
        updatedAt: string | null;
        status: PahinaNoteStatus;
        active: boolean | null;
        value: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type UpdatePahinaCaseMutationVariables = {
  input: UpdatePahinaCaseInput;
};

export type UpdatePahinaCaseMutation = {
  updatePahinaCase: {
    __typename: 'PahinaCase';
    id: string;
    title: string;
    code: string;
    link: string | null;
    active: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
    notes: {
      __typename: 'ModelPahinaNoteConnection';
      items: Array<{
        __typename: 'PahinaNote';
        id: string;
        promotional: string | null;
        createdAt: string | null;
        updatedAt: string | null;
        status: PahinaNoteStatus;
        active: boolean | null;
        value: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type DeletePahinaCaseMutationVariables = {
  input: DeletePahinaCaseInput;
};

export type DeletePahinaCaseMutation = {
  deletePahinaCase: {
    __typename: 'PahinaCase';
    id: string;
    title: string;
    code: string;
    link: string | null;
    active: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
    notes: {
      __typename: 'ModelPahinaNoteConnection';
      items: Array<{
        __typename: 'PahinaNote';
        id: string;
        promotional: string | null;
        createdAt: string | null;
        updatedAt: string | null;
        status: PahinaNoteStatus;
        active: boolean | null;
        value: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type GetPahinaUserQueryVariables = {
  id: string;
};

export type GetPahinaUserQuery = {
  getPahinaUser: {
    __typename: 'PahinaUser';
    id: string;
    givenName: string;
    familyName: string;
    email: string;
    picture: string | null;
    identityId: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    active: boolean | null;
    notes: {
      __typename: 'ModelPahinaNoteConnection';
      items: Array<{
        __typename: 'PahinaNote';
        id: string;
        promotional: string | null;
        createdAt: string | null;
        updatedAt: string | null;
        status: PahinaNoteStatus;
        active: boolean | null;
        value: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type ListPahinaUsersQueryVariables = {
  filter?: ModelPahinaUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListPahinaUsersQuery = {
  listPahinaUsers: {
    __typename: 'ModelPahinaUserConnection';
    items: Array<{
      __typename: 'PahinaUser';
      id: string;
      givenName: string;
      familyName: string;
      email: string;
      picture: string | null;
      identityId: string | null;
      createdAt: string | null;
      updatedAt: string | null;
      active: boolean | null;
      notes: {
        __typename: 'ModelPahinaNoteConnection';
        nextToken: string | null;
      } | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetPahinaNoteQueryVariables = {
  id: string;
};

export type GetPahinaNoteQuery = {
  getPahinaNote: {
    __typename: 'PahinaNote';
    id: string;
    author: {
      __typename: 'PahinaUser';
      id: string;
      givenName: string;
      familyName: string;
      email: string;
      picture: string | null;
      identityId: string | null;
      createdAt: string | null;
      updatedAt: string | null;
      active: boolean | null;
      notes: {
        __typename: 'ModelPahinaNoteConnection';
        nextToken: string | null;
      } | null;
    } | null;
    case: {
      __typename: 'PahinaCase';
      id: string;
      title: string;
      code: string;
      link: string | null;
      active: boolean | null;
      createdAt: string | null;
      updatedAt: string | null;
      notes: {
        __typename: 'ModelPahinaNoteConnection';
        nextToken: string | null;
      } | null;
    } | null;
    promotional: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    status: PahinaNoteStatus;
    active: boolean | null;
    value: string | null;
  } | null;
};

export type ListPahinaNotesQueryVariables = {
  filter?: ModelPahinaNoteFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListPahinaNotesQuery = {
  listPahinaNotes: {
    __typename: 'ModelPahinaNoteConnection';
    items: Array<{
      __typename: 'PahinaNote';
      id: string;
      author: {
        __typename: 'PahinaUser';
        id: string;
        givenName: string;
        familyName: string;
        email: string;
        picture: string | null;
        identityId: string | null;
        createdAt: string | null;
        updatedAt: string | null;
        active: boolean | null;
      } | null;
      case: {
        __typename: 'PahinaCase';
        id: string;
        title: string;
        code: string;
        link: string | null;
        active: boolean | null;
        createdAt: string | null;
        updatedAt: string | null;
      } | null;
      promotional: string | null;
      createdAt: string | null;
      updatedAt: string | null;
      status: PahinaNoteStatus;
      active: boolean | null;
      value: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetPahinaCaseQueryVariables = {
  id: string;
};

export type GetPahinaCaseQuery = {
  getPahinaCase: {
    __typename: 'PahinaCase';
    id: string;
    title: string;
    code: string;
    link: string | null;
    active: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
    notes: {
      __typename: 'ModelPahinaNoteConnection';
      items: Array<{
        __typename: 'PahinaNote';
        id: string;
        promotional: string | null;
        createdAt: string | null;
        updatedAt: string | null;
        status: PahinaNoteStatus;
        active: boolean | null;
        value: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type ListPahinaCasesQueryVariables = {
  filter?: ModelPahinaCaseFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListPahinaCasesQuery = {
  listPahinaCases: {
    __typename: 'ModelPahinaCaseConnection';
    items: Array<{
      __typename: 'PahinaCase';
      id: string;
      title: string;
      code: string;
      link: string | null;
      active: boolean | null;
      createdAt: string | null;
      updatedAt: string | null;
      notes: {
        __typename: 'ModelPahinaNoteConnection';
        nextToken: string | null;
      } | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnCreatePahinaCaseSubscription = {
  onCreatePahinaCase: {
    __typename: 'PahinaCase';
    id: string;
    title: string;
    code: string;
    link: string | null;
    active: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
    notes: {
      __typename: 'ModelPahinaNoteConnection';
      items: Array<{
        __typename: 'PahinaNote';
        id: string;
        promotional: string | null;
        createdAt: string | null;
        updatedAt: string | null;
        status: PahinaNoteStatus;
        active: boolean | null;
        value: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnUpdatePahinaCaseSubscription = {
  onUpdatePahinaCase: {
    __typename: 'PahinaCase';
    id: string;
    title: string;
    code: string;
    link: string | null;
    active: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
    notes: {
      __typename: 'ModelPahinaNoteConnection';
      items: Array<{
        __typename: 'PahinaNote';
        id: string;
        promotional: string | null;
        createdAt: string | null;
        updatedAt: string | null;
        status: PahinaNoteStatus;
        active: boolean | null;
        value: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnDeletePahinaCaseSubscription = {
  onDeletePahinaCase: {
    __typename: 'PahinaCase';
    id: string;
    title: string;
    code: string;
    link: string | null;
    active: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
    notes: {
      __typename: 'ModelPahinaNoteConnection';
      items: Array<{
        __typename: 'PahinaNote';
        id: string;
        promotional: string | null;
        createdAt: string | null;
        updatedAt: string | null;
        status: PahinaNoteStatus;
        active: boolean | null;
        value: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};
