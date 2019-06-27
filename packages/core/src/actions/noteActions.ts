import gql from 'graphql-tag';

import {
  GetPahinaNoteQuery,
  GetPahinaNoteQueryVariables,
  UpdatePahinaNoteMutation,
  UpdatePahinaNoteMutationVariables,
  UpdatePahinaNoteInput,
  CreatePahinaNoteInput,
  CreatePahinaNoteMutation,
  CreatePahinaNoteMutationVariables,
} from '../API';

import apollo from '../apollo-client';
import { logRecord, logInfo } from '../utils';
import { updatePahinaNote, getPahinaNote, createPahinaNote } from '../graphql';
import { AppCognitoUser } from '../../types';

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
};

export const handleUpdatePahinaNote = async (
  user: AppCognitoUser,
  data: UpdatePahinaNoteInput,
) => {
  logInfo('[START]', 'handleUpdatePahinaNote');
  try {
    const response = await apollo.mutate<
      UpdatePahinaNoteMutation,
      UpdatePahinaNoteMutationVariables
    >({
      mutation: gql(updatePahinaNote),
      variables: {
        input: {
          id: data.id,
          promotional: data.promotional,
          status: data.status,
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
          status: data.status,
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
      name: 'CreateNoteError',
      attributes: {
        error: e.message,
      },
    });
  }
};
