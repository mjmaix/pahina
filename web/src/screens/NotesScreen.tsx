import React, { useEffect } from 'react';
import { Subscribe } from 'unstated';
import moment from 'moment';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';

import './NotesScreen.css';
import { UserContainer } from '../unstated/UserContainer';
import {
  handleGetCurrentUser,
  handleGetAppSyncUser,
  AppSyncUserNote,
} from '../shared';

const userContainer = new UserContainer();

const NotesScreen: React.FC = () => {
  useEffect(() => {
    handleGetCurrentUser()
      .then(cognitoUser => handleGetAppSyncUser(cognitoUser.getUsername()))
      .then(appUser => {
        if (appUser && appUser.getPahinaUser) {
          userContainer.onSignIn(appUser.getPahinaUser);
        }
      });
  }, []);
  return (
    <Subscribe to={[userContainer]}>
      {(user: UserContainer) => {
        const notes = user.notes();
        if (!notes || !notes.items) {
          return null;
        }
        return (
          <div>
            {notes.items.map((n: AppSyncUserNote) => {
              if (!n) {
                return null;
              }
              return (
                <ListGroup key={n.id}>
                  <ListGroupItem>
                    <ListGroupItemHeading>
                      {`${n.status}-${
                        n.createdAt ? moment(n.createdAt).fromNow() : null
                      }`}
                    </ListGroupItemHeading>
                    {!!n.promotional && (
                      <ListGroupItemText>{n.promotional}</ListGroupItemText>
                    )}
                  </ListGroupItem>
                </ListGroup>
              );
            })}
          </div>
        );
      }}
    </Subscribe>
  );
};

export { NotesScreen };
