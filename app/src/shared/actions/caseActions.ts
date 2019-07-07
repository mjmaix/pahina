import gql from 'graphql-tag';
import apollo from '../awsApolloClient';
import { ListPahinaCasesQuery, ListPahinaCasesQueryVariables } from '../API';
import { logInfo, logRecord } from '../utils';
import { listPahinaCases } from '../graphql/queries';

export const handleListAppSyncCase = async (nextToken?: string | null) => {
  logInfo('[START]', 'handleListAppSyncCase');
  try {
    const response = await apollo.query<
      ListPahinaCasesQuery,
      ListPahinaCasesQueryVariables
    >({
      query: gql(listPahinaCases),
      variables: {
        nextToken,
      },
    });
    return response.data;
  } catch (e) {
    logRecord({
      name: 'ListCaseError',
      attributes: {
        error: e.message,
      },
    });
  }
  return null;
};
