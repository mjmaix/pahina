import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';

import { GetPahinaUserQuery, GetPahinaUserQueryVariables } from '../API';

import { getPahinaUser } from '../graphql/queries';

import { apolloClient as client } from '../setup';
import { logRecord, logInfo } from '../utils';

const assertErrors = (response: ApolloQueryResult<GetPahinaUserQuery>) => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }
};

export const handleGetAppSyncUser = async (username: string) => {
  logInfo('[START]', 'handleGetAppSyncUser');
  try {
    const response = await client.query<
      GetPahinaUserQuery,
      GetPahinaUserQueryVariables
    >({
      query: gql(getPahinaUser),
      variables: { id: username },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    assertErrors(response);
    return response.data;
  } catch (e) {
    logRecord({
      name: 'GetUserError',
      attributes: {
        error: e.message,
      },
    });
  }
};
