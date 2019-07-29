import gql from 'graphql-tag';
import apollo from '../awsApolloClient';
import { logInfo, logRecord } from '../utils';
import { getConfig } from '../graphql/queries';
import { GetConfigQuery } from '../API';

export const handleGetConfig = async () => {
  logInfo('[START]', 'handleGetConfig');
  try {
    const response = await apollo.query<GetConfigQuery>({
      query: gql(getConfig),
    });
    return response.data;
  } catch (e) {
    logRecord({
      name: 'GetConfig',
      attributes: {
        error: e.message,
      },
    });
  }
  return null;
};
