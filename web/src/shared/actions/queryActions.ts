import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import apollo from '../apollo-client';
import { getPahinaUser } from '../graphql/queries';
import { GetPahinaUserQueryVariables, GetPahinaUserQuery } from '../API';
import { logInfo, logRecord } from '../utils';

const __DEV__ = process.env.NODE_ENV;

const assertErrors = (response: ApolloQueryResult<GetPahinaUserQuery>) => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }
};

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
  return null;
};
