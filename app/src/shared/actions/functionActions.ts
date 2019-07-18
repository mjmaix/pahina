import gql from 'graphql-tag';
import apollo from '../awsApolloClient';
import { logInfo, logRecord } from '../utils';
import { getStorefrontConfig } from '../graphql/queries';
import { GetStorefrontConfigQuery } from '../API';

export const handleGetStorefrontConfig = async () => {
  logInfo('[START]', 'handleGetStorefrontConfig');
  try {
    const response = await apollo.query<GetStorefrontConfigQuery>({
      query: gql(getStorefrontConfig),
    });
    return response.data;
  } catch (e) {
    logRecord({
      name: 'GetStorefrontApi',
      attributes: {
        error: e.message,
      },
    });
  }
  return null;
};
