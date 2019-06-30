import gql from 'graphql-tag';
import apollo from '../apollo-client';
import { getPahinaUser } from '../graphql/queries';
import { GetPahinaUserQueryVariables, GetPahinaUserQuery } from '../API';
import { logInfo, logRecord } from '../utils';

export const handleGetAppSyncUser = async (username: string) => {
  logInfo('[START]', 'handleGetAppSyncUser');
  try {
    const response = await apollo.query<
      GetPahinaUserQuery,
      GetPahinaUserQueryVariables
    >({
      query: gql(getPahinaUser),
      variables: { id: username },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
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
