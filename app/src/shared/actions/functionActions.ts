import gql from 'graphql-tag';
import apollo from '../awsApolloClient';
import { GetStorefrontApiQuery } from '../API';
import { logInfo, logRecord } from '../utils';
import { getStorefrontConfig } from '../graphql/queries';

export const handleGetStorefrontConfig = async () => {
  logInfo('[START]', 'handleGetStorefrontConfig');
  try {
    const response = await apollo.query<GetStorefrontApiQuery>({
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
