/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreatePahinaUserInput = {
  id?: string | null,
  givenName: string,
  familyName: string,
  email: string,
  picture?: string | null,
  identityId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdatePahinaUserInput = {
  id: string,
  givenName?: string | null,
  familyName?: string | null,
  email?: string | null,
  picture?: string | null,
  identityId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeletePahinaUserInput = {
  id?: string | null,
};

export type ModelPahinaUserFilterInput = {
  id?: ModelIDFilterInput | null,
  givenName?: ModelStringFilterInput | null,
  familyName?: ModelStringFilterInput | null,
  email?: ModelStringFilterInput | null,
  picture?: ModelStringFilterInput | null,
  identityId?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  and?: Array< ModelPahinaUserFilterInput | null > | null,
  or?: Array< ModelPahinaUserFilterInput | null > | null,
  not?: ModelPahinaUserFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type CreatePahinaUserMutationVariables = {
  input: CreatePahinaUserInput,
};

export type CreatePahinaUserMutation = {
  createPahinaUser:  {
    __typename: "PahinaUser",
    id: string,
    givenName: string,
    familyName: string,
    email: string,
    picture: string | null,
    identityId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type UpdatePahinaUserMutationVariables = {
  input: UpdatePahinaUserInput,
};

export type UpdatePahinaUserMutation = {
  updatePahinaUser:  {
    __typename: "PahinaUser",
    id: string,
    givenName: string,
    familyName: string,
    email: string,
    picture: string | null,
    identityId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type DeletePahinaUserMutationVariables = {
  input: DeletePahinaUserInput,
};

export type DeletePahinaUserMutation = {
  deletePahinaUser:  {
    __typename: "PahinaUser",
    id: string,
    givenName: string,
    familyName: string,
    email: string,
    picture: string | null,
    identityId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type GetPahinaUserQueryVariables = {
  id: string,
};

export type GetPahinaUserQuery = {
  getPahinaUser:  {
    __typename: "PahinaUser",
    id: string,
    givenName: string,
    familyName: string,
    email: string,
    picture: string | null,
    identityId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type ListPahinaUsersQueryVariables = {
  filter?: ModelPahinaUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPahinaUsersQuery = {
  listPahinaUsers:  {
    __typename: "ModelPahinaUserConnection",
    items:  Array< {
      __typename: "PahinaUser",
      id: string,
      givenName: string,
      familyName: string,
      email: string,
      picture: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreatePahinaUserSubscription = {
  onCreatePahinaUser:  {
    __typename: "PahinaUser",
    id: string,
    givenName: string,
    familyName: string,
    email: string,
    picture: string | null,
    identityId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnUpdatePahinaUserSubscription = {
  onUpdatePahinaUser:  {
    __typename: "PahinaUser",
    id: string,
    givenName: string,
    familyName: string,
    email: string,
    picture: string | null,
    identityId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnDeletePahinaUserSubscription = {
  onDeletePahinaUser:  {
    __typename: "PahinaUser",
    id: string,
    givenName: string,
    familyName: string,
    email: string,
    picture: string | null,
    identityId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};
