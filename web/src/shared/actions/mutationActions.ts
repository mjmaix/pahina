import { ApolloQueryResult } from 'apollo-client/core/types';
import { FetchResult } from 'apollo-link';
import gql from 'graphql-tag';

import apollo from '../apollo-client';
import {
  CreatePahinaUserMutation,
  CreatePahinaUserMutationVariables,
  UpdatePahinaUserMutation,
  UpdatePahinaUserMutationVariables,
} from '../../shared';
import { logInfo, logRecord } from '../utils';
import { AppCognitoUser } from '../types';
import { createPahinaUser, updatePahinaUser } from '../graphql/mutations';

const __DEV__ = process.env.NODE_ENV;

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
    picture: user.attributes.picture,
    identityId,
  };
  try {
    const response = await apollo.mutate<
      CreatePahinaUserMutation,
      CreatePahinaUserMutationVariables
    >({
      mutation: gql(createPahinaUser),
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
      picture: user.attributes.picture,
      identityId,
    };
    const response = await apollo.mutate<
      UpdatePahinaUserMutation,
      UpdatePahinaUserMutationVariables
    >({
      mutation: gql(updatePahinaUser),
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
