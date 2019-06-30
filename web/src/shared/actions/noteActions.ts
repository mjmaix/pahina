import gql from 'graphql-tag';

import apollo from '../apollo-client';
import { logInfo, logRecord } from '../utils';
import {
  GetPahinaNoteQuery,
  GetPahinaNoteQueryVariables,
  UpdatePahinaNoteInput,
  UpdatePahinaNoteMutation,
  UpdatePahinaNoteMutationVariables,
  DeletePahinaNoteMutation,
  DeletePahinaNoteMutationVariables,
  CreatePahinaNoteMutationVariables,
  CreatePahinaNoteMutation,
  CreatePahinaNoteInput,
  PahinaNoteStatus,
} from '../API';
import { getPahinaNote } from '../graphql/queries';
import { AppCognitoUser } from '../types';
import { updatePahinaNote, createPahinaNote } from '../graphql/mutations';

const __DEV__ = process.env.NODE_ENV;

export const handleGetPahinaNote = async (noteId: string) => {
  logInfo('[START]', 'handleGetPahinaNote');
  try {
    const response = await apollo.query<
      GetPahinaNoteQuery,
      GetPahinaNoteQueryVariables
    >({
      query: gql(getPahinaNote),
      variables: { id: noteId },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    return response.data;
  } catch (e) {
    logRecord({
      name: 'GetNoteError',
      attributes: {
        error: e.message,
      },
    });
  }
  return null;
};

export const handleUpdatePahinaNote = async (
  user: AppCognitoUser,
  data: UpdatePahinaNoteInput,
) => {
  logInfo('[START]', 'handleUpdatePahinaNote');

  try {
    let updateStatus = data.status || PahinaNoteStatus.DRAFT;
    if (data.status === PahinaNoteStatus.PUBLISHED) {
      updateStatus = PahinaNoteStatus.PUBLISHED_EDITED;
    }
    const response = await apollo.mutate<
      UpdatePahinaNoteMutation,
      UpdatePahinaNoteMutationVariables
    >({
      mutation: gql(updatePahinaNote),
      variables: {
        input: {
          id: data.id,
          promotional: data.promotional,
          status: updateStatus,
          pahinaNoteAuthorId: user.getUsername(),
          pahinaNoteCaseId: null,
          value: data.value,
        },
      },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    return response.data;
  } catch (e) {
    logRecord({
      name: 'UpdateNoteError',
      attributes: {
        error: e.message,
      },
    });
  }
};

export const handlSetPahinaNoteStatus = async (
  noteId: string,
  status: PahinaNoteStatus,
) => {
  logInfo('[START]', 'handlSetPahinaNoteStatus');

  try {
    const response = await apollo.mutate<
      UpdatePahinaNoteMutation,
      UpdatePahinaNoteMutationVariables
    >({
      mutation: gql(updatePahinaNote),
      variables: {
        input: {
          id: noteId,
          status,
        },
      },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    return response.data;
  } catch (e) {
    logRecord({
      name: 'UpdateNoteError',
      attributes: {
        error: e.message,
      },
    });
  }
};

export const handlDeletePahinaNote = async (noteId: string) => {
  logInfo('[START]', 'handlDeletePahinaNote');

  try {
    const response = await apollo.mutate<
      DeletePahinaNoteMutation,
      DeletePahinaNoteMutationVariables
    >({
      mutation: gql(updatePahinaNote),
      variables: {
        input: {
          id: noteId,
        },
      },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    return response.data;
  } catch (e) {
    logRecord({
      name: 'DeleteNoteError',
      attributes: {
        error: e.message,
      },
    });
  }
};

export const handleCreatePahinaNote = async (
  user: AppCognitoUser,
  data: CreatePahinaNoteInput,
) => {
  logInfo('[START]', 'handleCreatePahinaNote');
  try {
    const response = await apollo.mutate<
      CreatePahinaNoteMutation,
      CreatePahinaNoteMutationVariables
    >({
      mutation: gql(createPahinaNote),
      variables: {
        input: {
          id: data.id,
          promotional: data.promotional,
          status: data.status || PahinaNoteStatus.DRAFT,
          pahinaNoteAuthorId: user.getUsername(),
          pahinaNoteCaseId: data.pahinaNoteCaseId,
          value: data.value,
        },
      },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    return response.data;
  } catch (e) {
    logRecord({
      name: 'CreateNoteError',
      attributes: {
        error: e.message,
      },
    });
  }
};
