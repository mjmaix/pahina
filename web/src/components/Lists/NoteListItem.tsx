import React, { useState, SetStateAction, Dispatch } from 'react';
import moment from 'moment';

import {
  Button,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  ButtonGroup,
  NavLink,
} from 'reactstrap';

import {
  handlSetPahinaNoteStatus,
  handlDeletePahinaNote,
  PahinaNoteStatus,
  AppSyncUserNote,
} from '../../shared';
import './NoteListItem.css';
import { Subscribe } from 'unstated';
import { SystemContainer, UserContainer } from '../../unstated';

interface Setters {
  setSubmitting: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: (message: string | null) => any;
  setSuccessMessage: (message: string | null) => any;
  fetchAppUser: () => any;
}

const updateAction = async (
  id: string,
  status: PahinaNoteStatus,
  { setSubmitting, setErrorMessage, setSuccessMessage, fetchAppUser }: Setters,
) => {
  try {
    setSubmitting(true);
    await handlSetPahinaNoteStatus(id, status);
    setSuccessMessage('Success');
    await fetchAppUser();
  } catch (err) {
    setErrorMessage('Failed');
  } finally {
    setSubmitting(false);
  }
};

const deleteAction = async (
  id: string,
  { setSubmitting, setErrorMessage, setSuccessMessage, fetchAppUser }: Setters,
) => {
  try {
    setSubmitting(true);
    await handlDeletePahinaNote(id);
    setSuccessMessage('Success');
    await fetchAppUser();
  } catch (err) {
    setErrorMessage('Failed');
  } finally {
    setSubmitting(false);
  }
};

export const NoteListItem = (props: AppSyncUserNote) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { id, status, updatedAt, promotional } = props;
  const fromTime = !!updatedAt
    ? `updated ${moment(updatedAt).fromNow()}`
    : null;

  const allowPublish = status !== PahinaNoteStatus.PUBLISHED;
  const allowUnpublish =
    status &&
    [PahinaNoteStatus.PUBLISHED, PahinaNoteStatus.PUBLISHED_EDITED].includes(
      status,
    );
  const allowDelete = status === PahinaNoteStatus.DRAFT;

  return (
    <Subscribe to={[SystemContainer, UserContainer]}>
      {(system: SystemContainer, user: UserContainer) => {
        if (!system || !user) {
          return null;
        }

        const { setSuccessMessage, setErrorMessage } = system;
        const { fetchAppUser } = user;

        const setters = {
          setSubmitting,
          setErrorMessage,
          setSuccessMessage,
          fetchAppUser,
        };

        const PublishButton = allowPublish && (
          <Button
            outline
            color="success"
            disabled={submitting}
            onClick={() =>
              updateAction(id, PahinaNoteStatus.PUBLISHED, setters)
            }
          >
            Publish
          </Button>
        );
        const UnpublishButton = allowUnpublish && (
          <Button
            outline
            color="warning"
            disabled={submitting}
            onClick={() => updateAction(id, PahinaNoteStatus.UNLISTED, setters)}
          >
            Unpublish
          </Button>
        );
        const DeleteButton = allowDelete && (
          <Button
            outline
            color="danger"
            disabled={submitting}
            onClick={() => deleteAction(id, setters)}
          >
            Delete
          </Button>
        );
        return (
          <ListGroupItem className="">
            <ListGroupItemHeading className="row justify-content-between align-items-md-start">
              <NavLink
                target="_blank"
                href={`/editor/${id}`}
                className="col-md-9 col-sm-12 text-md-left text-center"
              >{`${status}, ${fromTime}`}</NavLink>
              <div className="row col-sm-12 col-md-3 justify-content-md-end">
                <ButtonGroup className="" size="sm">
                  {PublishButton}
                  {UnpublishButton}
                  {DeleteButton}
                </ButtonGroup>
              </div>
            </ListGroupItemHeading>
            {!!promotional && (
              <ListGroupItemText>{promotional}</ListGroupItemText>
            )}
          </ListGroupItem>
        );
      }}
    </Subscribe>
  );
};
