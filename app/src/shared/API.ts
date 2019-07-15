/* tslint:disable */
//  This file was automatically generated and should not be edited.

export enum PahinaNoteStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  PUBLISHED_EDITED = "PUBLISHED_EDITED",
  UNLISTED = "UNLISTED",
}


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

export enum PahinaPriceLevel {
  L_0 = "L_0",
  L_50 = "L_50",
  L_100 = "L_100",
  L_150 = "L_150",
  L_200 = "L_200",
  L_250 = "L_250",
  L_300 = "L_300",
  L_350 = "L_350",
  L_400 = "L_400",
  L_450 = "L_450",
  L_500 = "L_500",
}


export enum PahinaStoreProductStatus {
  SENT = "SENT",
  CREATING = "CREATING",
  CREATED = "CREATED",
  FAILED = "FAILED",
}


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

export type CreatePahinaNoteInput = {
  id?: string | null,
  promotional?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  status?: PahinaNoteStatus | null,
  priceLevel?: PahinaPriceLevel | null,
  value?: string | null,
  pahinaNoteAuthorId?: string | null,
  pahinaNoteCaseId?: string | null,
};

export type UpdatePahinaNoteInput = {
  id: string,
  promotional?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  status?: PahinaNoteStatus | null,
  priceLevel?: PahinaPriceLevel | null,
  value?: string | null,
  pahinaNoteAuthorId?: string | null,
  pahinaNoteCaseId?: string | null,
};

export type DeletePahinaNoteInput = {
  id?: string | null,
};

export type CreatePahinaCaseInput = {
  id?: string | null,
  title: string,
  code: string,
  date: string,
  link?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdatePahinaCaseInput = {
  id: string,
  title?: string | null,
  code?: string | null,
  date?: string | null,
  link?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeletePahinaCaseInput = {
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

export type ModelPahinaMainStoreFilterInput = {
  id?: ModelIDFilterInput | null,
  digitalPublicationId?: ModelStringFilterInput | null,
  digitalLocationId?: ModelStringFilterInput | null,
  and?: Array< ModelPahinaMainStoreFilterInput | null > | null,
  or?: Array< ModelPahinaMainStoreFilterInput | null > | null,
  not?: ModelPahinaMainStoreFilterInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelPahinaUserStoreFilterInput = {
  ownerId?: ModelStringFilterInput | null,
  skuPrefix?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  and?: Array< ModelPahinaUserStoreFilterInput | null > | null,
  or?: Array< ModelPahinaUserStoreFilterInput | null > | null,
  not?: ModelPahinaUserStoreFilterInput | null,
};

export type ModelPahinaUserStoreProductFilterInput = {
  sku?: ModelStringFilterInput | null,
  storeId?: ModelStringFilterInput | null,
  ownerId?: ModelStringFilterInput | null,
  shopifyProductId?: ModelStringFilterInput | null,
  shopifyShopId?: ModelStringFilterInput | null,
  onlineStoreUrl?: ModelStringFilterInput | null,
  onlineStorePreviewUrl?: ModelStringFilterInput | null,
  handle?: ModelStringFilterInput | null,
  status?: ModelPahinaStoreProductStatusFilterInput | null,
  rawResponse?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  digitalSignature?: ModelStringFilterInput | null,
  and?: Array< ModelPahinaUserStoreProductFilterInput | null > | null,
  or?: Array< ModelPahinaUserStoreProductFilterInput | null > | null,
  not?: ModelPahinaUserStoreProductFilterInput | null,
};

export type ModelPahinaStoreProductStatusFilterInput = {
  eq?: PahinaStoreProductStatus | null,
  ne?: PahinaStoreProductStatus | null,
};

export type ModelPahinaNoteFilterInput = {
  id?: ModelIDFilterInput | null,
  promotional?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  status?: ModelPahinaNoteStatusFilterInput | null,
  priceLevel?: ModelPahinaPriceLevelFilterInput | null,
  value?: ModelStringFilterInput | null,
  and?: Array< ModelPahinaNoteFilterInput | null > | null,
  or?: Array< ModelPahinaNoteFilterInput | null > | null,
  not?: ModelPahinaNoteFilterInput | null,
};

export type ModelPahinaNoteStatusFilterInput = {
  eq?: PahinaNoteStatus | null,
  ne?: PahinaNoteStatus | null,
};

export type ModelPahinaPriceLevelFilterInput = {
  eq?: PahinaPriceLevel | null,
  ne?: PahinaPriceLevel | null,
};

export type ModelPahinaCaseFilterInput = {
  id?: ModelIDFilterInput | null,
  title?: ModelStringFilterInput | null,
  code?: ModelStringFilterInput | null,
  date?: ModelStringFilterInput | null,
  link?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  and?: Array< ModelPahinaCaseFilterInput | null > | null,
  or?: Array< ModelPahinaCaseFilterInput | null > | null,
  not?: ModelPahinaCaseFilterInput | null,
};

export type GetPahinaUserSortedNotesQueryVariables = {
  id: string,
  notesNextToken?: string | null,
};

export type GetPahinaUserSortedNotesQuery = {
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
    notes:  {
      __typename: "ModelPahinaNoteConnection",
      items:  Array< {
        __typename: "PahinaNote",
        id: string,
        promotional: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        status: PahinaNoteStatus | null,
        value: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
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
    notes:  {
      __typename: "ModelPahinaNoteConnection",
      items:  Array< {
        __typename: "PahinaNote",
        id: string,
        promotional: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        status: PahinaNoteStatus | null,
        priceLevel: PahinaPriceLevel | null,
        value: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    stores:  {
      __typename: "ModelPahinaUserStoreConnection",
      items:  Array< {
        __typename: "PahinaUserStore",
        ownerId: string,
        skuPrefix: string,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    ownedProducts:  {
      __typename: "ModelPahinaUserStoreProductConnection",
      items:  Array< {
        __typename: "PahinaUserStoreProduct",
        sku: string,
        storeId: string,
        ownerId: string,
        shopifyProductId: string | null,
        shopifyShopId: string | null,
        onlineStoreUrl: string | null,
        onlineStorePreviewUrl: string | null,
        handle: string | null,
        status: PahinaStoreProductStatus | null,
        rawResponse: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        digitalSignature: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    notes:  {
      __typename: "ModelPahinaNoteConnection",
      items:  Array< {
        __typename: "PahinaNote",
        id: string,
        promotional: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        status: PahinaNoteStatus | null,
        priceLevel: PahinaPriceLevel | null,
        value: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    stores:  {
      __typename: "ModelPahinaUserStoreConnection",
      items:  Array< {
        __typename: "PahinaUserStore",
        ownerId: string,
        skuPrefix: string,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    ownedProducts:  {
      __typename: "ModelPahinaUserStoreProductConnection",
      items:  Array< {
        __typename: "PahinaUserStoreProduct",
        sku: string,
        storeId: string,
        ownerId: string,
        shopifyProductId: string | null,
        shopifyShopId: string | null,
        onlineStoreUrl: string | null,
        onlineStorePreviewUrl: string | null,
        handle: string | null,
        status: PahinaStoreProductStatus | null,
        rawResponse: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        digitalSignature: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    notes:  {
      __typename: "ModelPahinaNoteConnection",
      items:  Array< {
        __typename: "PahinaNote",
        id: string,
        promotional: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        status: PahinaNoteStatus | null,
        priceLevel: PahinaPriceLevel | null,
        value: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    stores:  {
      __typename: "ModelPahinaUserStoreConnection",
      items:  Array< {
        __typename: "PahinaUserStore",
        ownerId: string,
        skuPrefix: string,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    ownedProducts:  {
      __typename: "ModelPahinaUserStoreProductConnection",
      items:  Array< {
        __typename: "PahinaUserStoreProduct",
        sku: string,
        storeId: string,
        ownerId: string,
        shopifyProductId: string | null,
        shopifyShopId: string | null,
        onlineStoreUrl: string | null,
        onlineStorePreviewUrl: string | null,
        handle: string | null,
        status: PahinaStoreProductStatus | null,
        rawResponse: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        digitalSignature: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreatePahinaNoteMutationVariables = {
  input: CreatePahinaNoteInput,
};

export type CreatePahinaNoteMutation = {
  createPahinaNote:  {
    __typename: "PahinaNote",
    id: string,
    author:  {
      __typename: "PahinaUser",
      id: string,
      givenName: string,
      familyName: string,
      email: string,
      picture: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      notes:  {
        __typename: "ModelPahinaNoteConnection",
        nextToken: string | null,
      } | null,
      stores:  {
        __typename: "ModelPahinaUserStoreConnection",
        nextToken: string | null,
      } | null,
      ownedProducts:  {
        __typename: "ModelPahinaUserStoreProductConnection",
        nextToken: string | null,
      } | null,
    } | null,
    case:  {
      __typename: "PahinaCase",
      id: string,
      title: string,
      code: string,
      date: string,
      link: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      notes:  {
        __typename: "ModelPahinaNoteConnection",
        nextToken: string | null,
      } | null,
    } | null,
    promotional: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    status: PahinaNoteStatus | null,
    priceLevel: PahinaPriceLevel | null,
    value: string | null,
  } | null,
};

export type UpdatePahinaNoteMutationVariables = {
  input: UpdatePahinaNoteInput,
};

export type UpdatePahinaNoteMutation = {
  updatePahinaNote:  {
    __typename: "PahinaNote",
    id: string,
    author:  {
      __typename: "PahinaUser",
      id: string,
      givenName: string,
      familyName: string,
      email: string,
      picture: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      notes:  {
        __typename: "ModelPahinaNoteConnection",
        nextToken: string | null,
      } | null,
      stores:  {
        __typename: "ModelPahinaUserStoreConnection",
        nextToken: string | null,
      } | null,
      ownedProducts:  {
        __typename: "ModelPahinaUserStoreProductConnection",
        nextToken: string | null,
      } | null,
    } | null,
    case:  {
      __typename: "PahinaCase",
      id: string,
      title: string,
      code: string,
      date: string,
      link: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      notes:  {
        __typename: "ModelPahinaNoteConnection",
        nextToken: string | null,
      } | null,
    } | null,
    promotional: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    status: PahinaNoteStatus | null,
    priceLevel: PahinaPriceLevel | null,
    value: string | null,
  } | null,
};

export type DeletePahinaNoteMutationVariables = {
  input: DeletePahinaNoteInput,
};

export type DeletePahinaNoteMutation = {
  deletePahinaNote:  {
    __typename: "PahinaNote",
    id: string,
    author:  {
      __typename: "PahinaUser",
      id: string,
      givenName: string,
      familyName: string,
      email: string,
      picture: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      notes:  {
        __typename: "ModelPahinaNoteConnection",
        nextToken: string | null,
      } | null,
      stores:  {
        __typename: "ModelPahinaUserStoreConnection",
        nextToken: string | null,
      } | null,
      ownedProducts:  {
        __typename: "ModelPahinaUserStoreProductConnection",
        nextToken: string | null,
      } | null,
    } | null,
    case:  {
      __typename: "PahinaCase",
      id: string,
      title: string,
      code: string,
      date: string,
      link: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      notes:  {
        __typename: "ModelPahinaNoteConnection",
        nextToken: string | null,
      } | null,
    } | null,
    promotional: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    status: PahinaNoteStatus | null,
    priceLevel: PahinaPriceLevel | null,
    value: string | null,
  } | null,
};

export type CreatePahinaCaseMutationVariables = {
  input: CreatePahinaCaseInput,
};

export type CreatePahinaCaseMutation = {
  createPahinaCase:  {
    __typename: "PahinaCase",
    id: string,
    title: string,
    code: string,
    date: string,
    link: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    notes:  {
      __typename: "ModelPahinaNoteConnection",
      items:  Array< {
        __typename: "PahinaNote",
        id: string,
        promotional: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        status: PahinaNoteStatus | null,
        priceLevel: PahinaPriceLevel | null,
        value: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdatePahinaCaseMutationVariables = {
  input: UpdatePahinaCaseInput,
};

export type UpdatePahinaCaseMutation = {
  updatePahinaCase:  {
    __typename: "PahinaCase",
    id: string,
    title: string,
    code: string,
    date: string,
    link: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    notes:  {
      __typename: "ModelPahinaNoteConnection",
      items:  Array< {
        __typename: "PahinaNote",
        id: string,
        promotional: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        status: PahinaNoteStatus | null,
        priceLevel: PahinaPriceLevel | null,
        value: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeletePahinaCaseMutationVariables = {
  input: DeletePahinaCaseInput,
};

export type DeletePahinaCaseMutation = {
  deletePahinaCase:  {
    __typename: "PahinaCase",
    id: string,
    title: string,
    code: string,
    date: string,
    link: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    notes:  {
      __typename: "ModelPahinaNoteConnection",
      items:  Array< {
        __typename: "PahinaNote",
        id: string,
        promotional: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        status: PahinaNoteStatus | null,
        priceLevel: PahinaPriceLevel | null,
        value: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    notes:  {
      __typename: "ModelPahinaNoteConnection",
      items:  Array< {
        __typename: "PahinaNote",
        id: string,
        promotional: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        status: PahinaNoteStatus | null,
        priceLevel: PahinaPriceLevel | null,
        value: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    stores:  {
      __typename: "ModelPahinaUserStoreConnection",
      items:  Array< {
        __typename: "PahinaUserStore",
        ownerId: string,
        skuPrefix: string,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    ownedProducts:  {
      __typename: "ModelPahinaUserStoreProductConnection",
      items:  Array< {
        __typename: "PahinaUserStoreProduct",
        sku: string,
        storeId: string,
        ownerId: string,
        shopifyProductId: string | null,
        shopifyShopId: string | null,
        onlineStoreUrl: string | null,
        onlineStorePreviewUrl: string | null,
        handle: string | null,
        status: PahinaStoreProductStatus | null,
        rawResponse: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        digitalSignature: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
      notes:  {
        __typename: "ModelPahinaNoteConnection",
        nextToken: string | null,
      } | null,
      stores:  {
        __typename: "ModelPahinaUserStoreConnection",
        nextToken: string | null,
      } | null,
      ownedProducts:  {
        __typename: "ModelPahinaUserStoreProductConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPahinaMainStoreQueryVariables = {
  id: string,
};

export type GetPahinaMainStoreQuery = {
  getPahinaMainStore:  {
    __typename: "PahinaMainStore",
    id: string,
    digitalPublicationId: string | null,
    digitalLocationId: string | null,
  } | null,
};

export type ListPahinaMainStoresQueryVariables = {
  filter?: ModelPahinaMainStoreFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPahinaMainStoresQuery = {
  listPahinaMainStores:  {
    __typename: "ModelPahinaMainStoreConnection",
    items:  Array< {
      __typename: "PahinaMainStore",
      id: string,
      digitalPublicationId: string | null,
      digitalLocationId: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPahinaUserStoreQueryVariables = {
  ownerId: string,
  skuPrefix: string,
};

export type GetPahinaUserStoreQuery = {
  getPahinaUserStore:  {
    __typename: "PahinaUserStore",
    ownerId: string,
    skuPrefix: string,
    owner:  {
      __typename: "PahinaUser",
      id: string,
      givenName: string,
      familyName: string,
      email: string,
      picture: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      notes:  {
        __typename: "ModelPahinaNoteConnection",
        nextToken: string | null,
      } | null,
      stores:  {
        __typename: "ModelPahinaUserStoreConnection",
        nextToken: string | null,
      } | null,
      ownedProducts:  {
        __typename: "ModelPahinaUserStoreProductConnection",
        nextToken: string | null,
      } | null,
    },
    products:  {
      __typename: "ModelPahinaUserStoreProductConnection",
      items:  Array< {
        __typename: "PahinaUserStoreProduct",
        sku: string,
        storeId: string,
        ownerId: string,
        shopifyProductId: string | null,
        shopifyShopId: string | null,
        onlineStoreUrl: string | null,
        onlineStorePreviewUrl: string | null,
        handle: string | null,
        status: PahinaStoreProductStatus | null,
        rawResponse: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        digitalSignature: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type ListPahinaUserStoresQueryVariables = {
  ownerId?: string | null,
  skuPrefix?: ModelStringKeyConditionInput | null,
  filter?: ModelPahinaUserStoreFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPahinaUserStoresQuery = {
  listPahinaUserStores:  {
    __typename: "ModelPahinaUserStoreConnection",
    items:  Array< {
      __typename: "PahinaUserStore",
      ownerId: string,
      skuPrefix: string,
      owner:  {
        __typename: "PahinaUser",
        id: string,
        givenName: string,
        familyName: string,
        email: string,
        picture: string | null,
        identityId: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      },
      products:  {
        __typename: "ModelPahinaUserStoreProductConnection",
        nextToken: string | null,
      } | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPahinaUserStoreProductQueryVariables = {
  storeId: string,
  sku: string,
};

export type GetPahinaUserStoreProductQuery = {
  getPahinaUserStoreProduct:  {
    __typename: "PahinaUserStoreProduct",
    sku: string,
    storeId: string,
    ownerId: string,
    owner:  {
      __typename: "PahinaUser",
      id: string,
      givenName: string,
      familyName: string,
      email: string,
      picture: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      notes:  {
        __typename: "ModelPahinaNoteConnection",
        nextToken: string | null,
      } | null,
      stores:  {
        __typename: "ModelPahinaUserStoreConnection",
        nextToken: string | null,
      } | null,
      ownedProducts:  {
        __typename: "ModelPahinaUserStoreProductConnection",
        nextToken: string | null,
      } | null,
    } | null,
    store:  {
      __typename: "PahinaUserStore",
      ownerId: string,
      skuPrefix: string,
      owner:  {
        __typename: "PahinaUser",
        id: string,
        givenName: string,
        familyName: string,
        email: string,
        picture: string | null,
        identityId: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      },
      products:  {
        __typename: "ModelPahinaUserStoreProductConnection",
        nextToken: string | null,
      } | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    shopifyProductId: string | null,
    shopifyShopId: string | null,
    onlineStoreUrl: string | null,
    onlineStorePreviewUrl: string | null,
    handle: string | null,
    status: PahinaStoreProductStatus | null,
    rawResponse: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    digitalSignature: string | null,
  } | null,
};

export type ListPahinaUserStoreProductsQueryVariables = {
  storeId?: string | null,
  sku?: ModelStringKeyConditionInput | null,
  filter?: ModelPahinaUserStoreProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPahinaUserStoreProductsQuery = {
  listPahinaUserStoreProducts:  {
    __typename: "ModelPahinaUserStoreProductConnection",
    items:  Array< {
      __typename: "PahinaUserStoreProduct",
      sku: string,
      storeId: string,
      ownerId: string,
      owner:  {
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
      store:  {
        __typename: "PahinaUserStore",
        ownerId: string,
        skuPrefix: string,
        createdAt: string | null,
        updatedAt: string | null,
      } | null,
      shopifyProductId: string | null,
      shopifyShopId: string | null,
      onlineStoreUrl: string | null,
      onlineStorePreviewUrl: string | null,
      handle: string | null,
      status: PahinaStoreProductStatus | null,
      rawResponse: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      digitalSignature: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPahinaNoteQueryVariables = {
  id: string,
};

export type GetPahinaNoteQuery = {
  getPahinaNote:  {
    __typename: "PahinaNote",
    id: string,
    author:  {
      __typename: "PahinaUser",
      id: string,
      givenName: string,
      familyName: string,
      email: string,
      picture: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      notes:  {
        __typename: "ModelPahinaNoteConnection",
        nextToken: string | null,
      } | null,
      stores:  {
        __typename: "ModelPahinaUserStoreConnection",
        nextToken: string | null,
      } | null,
      ownedProducts:  {
        __typename: "ModelPahinaUserStoreProductConnection",
        nextToken: string | null,
      } | null,
    } | null,
    case:  {
      __typename: "PahinaCase",
      id: string,
      title: string,
      code: string,
      date: string,
      link: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      notes:  {
        __typename: "ModelPahinaNoteConnection",
        nextToken: string | null,
      } | null,
    } | null,
    promotional: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    status: PahinaNoteStatus | null,
    priceLevel: PahinaPriceLevel | null,
    value: string | null,
  } | null,
};

export type ListPahinaNotesQueryVariables = {
  filter?: ModelPahinaNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPahinaNotesQuery = {
  listPahinaNotes:  {
    __typename: "ModelPahinaNoteConnection",
    items:  Array< {
      __typename: "PahinaNote",
      id: string,
      author:  {
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
      case:  {
        __typename: "PahinaCase",
        id: string,
        title: string,
        code: string,
        date: string,
        link: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null,
      promotional: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      status: PahinaNoteStatus | null,
      priceLevel: PahinaPriceLevel | null,
      value: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPahinaCaseQueryVariables = {
  id: string,
};

export type GetPahinaCaseQuery = {
  getPahinaCase:  {
    __typename: "PahinaCase",
    id: string,
    title: string,
    code: string,
    date: string,
    link: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    notes:  {
      __typename: "ModelPahinaNoteConnection",
      items:  Array< {
        __typename: "PahinaNote",
        id: string,
        promotional: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        status: PahinaNoteStatus | null,
        priceLevel: PahinaPriceLevel | null,
        value: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListPahinaCasesQueryVariables = {
  filter?: ModelPahinaCaseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPahinaCasesQuery = {
  listPahinaCases:  {
    __typename: "ModelPahinaCaseConnection",
    items:  Array< {
      __typename: "PahinaCase",
      id: string,
      title: string,
      code: string,
      date: string,
      link: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      notes:  {
        __typename: "ModelPahinaNoteConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreatePahinaCaseSubscription = {
  onCreatePahinaCase:  {
    __typename: "PahinaCase",
    id: string,
    title: string,
    code: string,
    date: string,
    link: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    notes:  {
      __typename: "ModelPahinaNoteConnection",
      items:  Array< {
        __typename: "PahinaNote",
        id: string,
        promotional: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        status: PahinaNoteStatus | null,
        priceLevel: PahinaPriceLevel | null,
        value: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};
