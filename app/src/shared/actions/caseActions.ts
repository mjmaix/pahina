import gql from 'graphql-tag';
import apollo from '../awsApolloClient';
import { ListPahinaCasesQuery, ListPahinaCasesQueryVariables } from '../API';
import { logInfo, logRecord, GRAPHQL_SCAN_LIMIT } from '../utils';
import { listPahinaCases } from '../graphql/queries';

export const handleListAppSyncCase = async (
  nextToken?: string | null,
  search?: string | null,
) => {
  logInfo('[START]', 'handleListAppSyncCase');

  let filter;
  if (search) {
    filter = {
      or: [
        {
          title: {
            contains: search.toUpperCase(),
          },
        },
        {
          code: {
            contains: search.toUpperCase(),
          },
        },
        {
          date: {
            contains: search.toUpperCase(),
          },
        },
      ],
    };
  }
  try {
    const response = await apollo.query<
      ListPahinaCasesQuery,
      ListPahinaCasesQueryVariables
    >({
      query: gql(listPahinaCases),
      variables: {
        nextToken,
        filter,
        limit: GRAPHQL_SCAN_LIMIT,
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
