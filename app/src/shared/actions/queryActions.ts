import gql from 'graphql-tag';
import apollo from '../awsApolloClient';
import {
  GetPahinaUserSortedNotesQueryVariables,
  GetPahinaUserSortedNotesQuery,
} from '../API';
import { logInfo, logRecord } from '../utils';
import { getPahinaUserSortedNotes } from '../graphql/customQueries';

export const handleGetAppSyncUser = async (
  username: string,
  notesNextToken?: string,
) => {
  logInfo('[START]', 'handleGetAppSyncUser');
  try {
    const response = await apollo.query<
      GetPahinaUserSortedNotesQuery,
      GetPahinaUserSortedNotesQueryVariables
    >({
      query: gql(getPahinaUserSortedNotes),
      variables: {
        id: username,
        notesNextToken,
      },
    });
    return response.data;
  } catch (e) {
    logRecord({
      name: 'GetUserError',
      attributes: {
        error: e.message,
      },
    });
  }
  return null;
};
