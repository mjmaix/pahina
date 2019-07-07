import React from 'react';
import { Subscribe } from 'unstated';
import { ListGroup, NavLink, ListGroupItem, Spinner } from 'reactstrap';

import Icon from 'react-icons-kit';
import { chevronsDown } from 'react-icons-kit/feather/chevronsDown';

import './NotesScreen.css';
import './Screen.css';
import { UserContainer } from '../unstated/UserContainer';
import { AppSyncUserNote } from '../shared';
import { NoteListItem } from '../components/Lists';
import { IconSize } from '../themes/constants';

const NotesEmptyComponent = () => (
  <div className="text-center">
    <h6>You don't have any notes saved.</h6>
    <NavLink href="/editor">Create your first note.</NavLink>
  </div>
);

const MoreComponent = (isFetchingMore: boolean) => {
  return isFetchingMore ? (
    <Spinner />
  ) : (
    <Icon size={IconSize.MD} icon={chevronsDown} />
  );
};

const NotesScreen: React.FC = () => (
  <Subscribe to={[UserContainer]}>
    {(userCntr: UserContainer) => {
      const notes = userCntr.notes();
      const { user, isFetchingMore } = userCntr.state;
      const { fetchMoreNotes } = userCntr;
      const nextNotes = user && user.notes && user.notes.nextToken;
      if (!notes || !user) {
        return null;
      }
      // TODO: candidate for reuse with feching
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
                <ListGroupItem
                  className="text-center"
                  onMouseEnter={async () => {
                    await fetchMoreNotes(nextNotes);
                  }}
                >
                  {MoreComponent(isFetchingMore)}
                </ListGroupItem>
              )}
            </ListGroup>
          </div>
        </div>
      );
    }}
  </Subscribe>
);

export { NotesScreen };
