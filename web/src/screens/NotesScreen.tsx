import React from 'react';
import { Subscribe } from 'unstated';
import { ListGroup, NavLink, ListGroupItem } from 'reactstrap';

import Icon from 'react-icons-kit';
import { chevronsDown } from 'react-icons-kit/feather/chevronsDown';

import './NotesScreen.css';
import './Screen.css';
import { UserContainer } from '../unstated/UserContainer';
import { AppSyncUserNote } from '../shared';
import { NoteListItem } from '../components/Lists';
import { IconSize } from '../themes/constants';

const NotesEmptyComponent = (
  <div className="text-center">
    <h6>You don't have any notes saved.</h6>
    <NavLink href="/editor">Create your first note.</NavLink>
  </div>
);

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
            <h3 className="Pad-lg text-center">Manage notes</h3>
            {notes.items.length === 0 && NotesEmptyComponent}
            <div className="container">
              <ListGroup className="Margin-bottom-lg ">
                {notes.items.map((n: AppSyncUserNote | null) => {
                  if (!n) {
                    return null;
                  }
                  return <NoteListItem {...n} key={n.id} />;
                })}
                <ListGroupItem
                  className="text-center"
                  onMouseEnter={() => console.log('Load more hovered')}
                >
                  <Icon size={IconSize.MD} icon={chevronsDown} />
                </ListGroupItem>
              </ListGroup>
            </div>
          </div>
        );
      }}
    </Subscribe>
  );
};

export { NotesScreen };
