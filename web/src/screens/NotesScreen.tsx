import React from 'react';
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
import { AppSyncUserNote } from '../shared';

const NotesScreen: React.FC = () => {
  return (
    <Subscribe to={[UserContainer]}>
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
                  <ListGroupItem tag="a" href={`/editor/${n.id}`}>
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
