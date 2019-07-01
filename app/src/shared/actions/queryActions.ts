import gql from 'graphql-tag';
import apollo from '../apollo-client';
import { GetPahinaUserQueryVariables, GetPahinaUserQuery } from '../API';
import { logInfo, logRecord } from '../utils';
import { getPahinaUserSortedNotes } from '../graphql/customQueries';

export const handleGetAppSyncUser = async (username: string) => {
  logInfo('[START]', 'handleGetAppSyncUser');
  try {
    const response = await apollo.query<
      GetPahinaUserQuery,
      GetPahinaUserQueryVariables
    >({
      query: gql(getPahinaUserSortedNotes),
      variables: { id: username },
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
