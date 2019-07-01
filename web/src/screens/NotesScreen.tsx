import React from 'react';
import { Subscribe } from 'unstated';
import { ListGroup, NavLink } from 'reactstrap';

import './NotesScreen.css';
import { UserContainer } from '../unstated/UserContainer';
import { AppSyncUserNote } from '../shared';
import { NoteListItem } from '../components/Lists';

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
            <h3 className="pad-big text-center">Manage notes</h3>
            {notes.items.length === 0 && (
              <div className="text-center">
                <h6>You don't have any notes saved.</h6>
                <NavLink href="/editor">Create your first note.</NavLink>
              </div>
            )}
            <div className="container">
              <ListGroup>
                {notes.items.map((n: AppSyncUserNote | null) => {
                  if (!n) {
                    return null;
                  }
                  return <NoteListItem {...n} key={n.id} />;
                })}
              </ListGroup>
            </div>
          </div>
        );
      }}
    </Subscribe>
  );
};

export { NotesScreen };
