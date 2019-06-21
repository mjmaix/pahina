import { ApolloCurrentResult } from 'apollo-client';
import { ApolloQueryResult } from 'apollo-client/core/types';
import { FetchResult } from 'apollo-link';
import gql from 'graphql-tag';

import * as mutations from '../../graphql/mutations';
import { apolloClient as client } from '../../setup';
import { logInfo } from '../../utils';
import { logRecord } from '../../reports';
import {
  CreatePahinaUserMutation,
  CreatePahinaUserMutationVariables,
  UpdatePahinaUserMutation,
  UpdatePahinaUserMutationVariables,
} from '../../../../backend/src/API';

interface DataWrapper<T> extends ApolloCurrentResult<T> {
  data: T;
}

const assertErrors = (response: ApolloQueryResult<any> | FetchResult<any>) => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }
};

export const handleCreateAppSyncUser = async (
  user: AppCognitoUser,
  identityId?: string,
) => {
  logInfo('[START]', 'handleCreateAppSyncUser');
  const newUser = {
    id: user.getUsername(),
    email: user.attributes.email,
    familyName: user.attributes.family_name,
    givenName: user.attributes.given_name,
    avatar: user.attributes.picture,
    identityId,
  };
  try {
    const response = await client.mutate<
      CreatePahinaUserMutation,
      CreatePahinaUserMutationVariables
    >({
      mutation: gql(mutations.createPahinaUser),
      optimisticResponse: { __typename: 'ClUser', createClUser: newUser },
      variables: {
        input: newUser,
      },
    });
    assertErrors(response);
    return response;
  } catch (e) {
    logRecord({
      name: 'CreateUserError',
      attributes: {
        error: e.message,
      },
    });
  }
};

export const handleUpdateAppSyncUser = async (
  user: AppCognitoUser,
  identityId?: string,
) => {
  logInfo('[START]', 'handleUpdateAppSyncUser');
  try {
    const newUser = {
      id: user.getUsername(),
      email: user.attributes.email,
      familyName: user.attributes.family_name,
      givenName: user.attributes.given_name,
      avatar: user.attributes.picture,
      identityId,
    };
    const response = await client.mutate<
      UpdatePahinaUserMutation,
      UpdatePahinaUserMutationVariables
    >({
      mutation: gql(mutations.updatePahinaUser),
      // TODO: test first
      // optimisticResponse: { __typename: 'ClUser', updateClUser: newUser },
      variables: {
        input: newUser,
      },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    assertErrors(response);
    return response;
  } catch (e) {
    logRecord({
      name: 'UpdateUserError',
      attributes: {
        error: e.message,
      },
    });
  }
};
