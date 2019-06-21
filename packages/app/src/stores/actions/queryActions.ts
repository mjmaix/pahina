import gql from 'graphql-tag';

import {
  GetPahinaUserQuery,
  GetPahinaUserQueryVariables,
} from '../../../../backend/src/API';

import { apolloClient as client } from '../../setup';
import { logRecord, logInfo } from '../../utils';
import { getPahinaUser } from '../../graphql/queries';
import { ApolloQueryResult } from 'apollo-client';

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
