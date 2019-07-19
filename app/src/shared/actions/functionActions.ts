import gql from 'graphql-tag';
import apollo from '../awsApolloClient';
import { logInfo, logRecord } from '../utils';
import { getShopifyStorefrontConfig } from '../graphql/queries';
import { GetShopifyStorefrontConfigQuery } from '../API';

export const handleGetStorefrontConfig = async () => {
  logInfo('[START]', 'handleGetStorefrontConfig');
  try {
    const response = await apollo.query<GetShopifyStorefrontConfigQuery>({
      query: gql(getShopifyStorefrontConfig),
    });
    return response.data;
  } catch (e) {
    logRecord({
      name: 'GetStorefrontConfig',
      attributes: {
        error: e.message,
      },
    });
  }
  return null;
};
