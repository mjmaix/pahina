import React from 'react';
import { Subscribe } from 'unstated';
import { ListGroup, NavLink } from 'reactstrap';

import './NotesScreen.css';
import './Screen.css';
import { UserContainer } from '../unstated/UserContainer';
import { AppSyncUserNote } from '../shared';
import { NoteListItem, FetchMoreItem } from '../components/Lists';

const NotesEmptyComponent = () => (
  <div className="text-center">
    <h6>You don't have any notes saved.</h6>
    <NavLink href="/editor">Create your first note.</NavLink>
  </div>
);

const NotesScreen: React.FC = () => (
  <Subscribe to={[UserContainer]}>
    {(userCntr: UserContainer) => {
      const notes = userCntr.notes();
      const { user, isFetchingMore } = userCntr.state;
      const { fetchMoreNotes } = userCntr;
      const nextNotes = user && user.notes && user.notes.nextToken;
      const loadMore = async () => {
        if (nextNotes) await fetchMoreNotes(nextNotes);
      };
      if (!notes || !user) {
        return null;
      }
      return (
        <div>
          <h3 className="Pad-lg text-center">Manage notes</h3>
          {notes.length === 0 && NotesEmptyComponent()}
          <div className="container">
            <ListGroup className="Margin-bottom-lg ">
              {notes.map((n: AppSyncUserNote | null) => {
                if (!n) {
                  return null;
                }
                return <NoteListItem {...n} key={n.id} />;
              })}
              {!!nextNotes && (
                <FetchMoreItem loading={isFetchingMore} loadMore={loadMore} />
              )}
            </ListGroup>
          </div>
        </div>
      );
    }}
  </Subscribe>
);

export { NotesScreen };
