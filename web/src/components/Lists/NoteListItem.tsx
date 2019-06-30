import React from 'react';
import moment from 'moment';

import {
  ButtonGroup,
  Button,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
} from 'reactstrap';

import { AppSyncUserNote } from '../../shared';
import './NoteListItem.css';

export const NoteListItem = (props: AppSyncUserNote) => {
  const { id, status, createdAt, promotional } = props;
  const fromTime = !!createdAt ? moment(createdAt).fromNow() : null;
  return (
    <ListGroupItem>
      <div className="margin-tiny NoteListItem-ShowHidden">
        <Row className="d-flex justify-content-between">
          <ListGroupItemHeading tag="a" href={`/editor/${id}`}>
            {`${status}-${fromTime}`}
          </ListGroupItemHeading>
          <ButtonGroup className="NoteListItem-ShowMe" size="sm">
            <Button outline color="success">
              Publish
            </Button>
            <Button outline color="warning">
              Unpublish
            </Button>
            <Button outline color="danger">
              Delete
            </Button>
          </ButtonGroup>
        </Row>
        {!!promotional && <ListGroupItemText>{promotional}</ListGroupItemText>}
      </div>
    </ListGroupItem>
  );
};
