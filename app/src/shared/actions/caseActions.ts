import gql from 'graphql-tag';
import apollo from '../awsApolloClient';
import { ListPahinaCasesQuery, ListPahinaCasesQueryVariables } from '../API';
import { logInfo, logRecord, GRAPHQL_SCAN_LIMIT } from '../utils';
import { listPahinaCases } from '../graphql/queries';

export type CaseSearchField = 'code' | 'title' | 'date';

export interface CaseSearch {
  text?: string | null;
  field?: CaseSearchField;
}

export const handleListAppSyncCase = async (
  nextToken?: string | null,
  search?: CaseSearch,
) => {
  logInfo('[START]', 'handleListAppSyncCase');

  let filter;
  if (search && search.text) {
    filter = {
      [search.field || 'code']: {
        contains: search.text.toUpperCase(),
      },
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
        limit: filter ? GRAPHQL_SCAN_LIMIT : undefined,
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
