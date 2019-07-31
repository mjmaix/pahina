import {
  handleGetCurrentUser,
  handleGetCurrentIdentityId,
} from './authActions';
import { handleCreateAppSyncUser } from './mutationActions';

import gql from 'graphql-tag';
import apollo from '../awsApolloClient';
import {
  GetPahinaUserSortedNotesQueryVariables,
  GetPahinaUserSortedNotesQuery,
} from '../API';
import { logInfo, logRecord } from '../utils';
import { getPahinaUserSortedNotes } from '../graphql/customQueries';

export const handleAppSyncUserCreate = async () => {
  logInfo('[START]', 'handleAppSyncUserCreate');
  const cognitoUser = await handleGetCurrentUser();
  const username = cognitoUser.getUsername();
  const response = await handleGetAppSyncUser(username);
  const userExists = response && response.getPahinaUser;
  if (!userExists) {
    logInfo('Create ClUser entry');
    const identityId = await handleGetCurrentIdentityId();
    return handleCreateAppSyncUser(cognitoUser, identityId);
  }
};

export const handleGetAppSyncUser = async (
  username: string,
  notesNextToken?: string,
) => {
  logInfo('[START]', 'handleGetAppSyncUser');
  try {
    const response = await apollo.query<
      GetPahinaUserSortedNotesQuery,
      GetPahinaUserSortedNotesQueryVariables
    >({
      query: gql(getPahinaUserSortedNotes),
      variables: {
        id: username,
        notesNextToken,
      },
      fetchPolicy: 'no-cache',
    });

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
