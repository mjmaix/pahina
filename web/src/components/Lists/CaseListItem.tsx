import React from 'react';

import {
  Button,
  ListGroupItem,
  ListGroupItemText,
  ButtonGroup,
  ListGroupItemHeading,
  NavLink,
} from 'reactstrap';

import { PahinaCase } from '../../shared';
import './NoteListItem.css';
import { RouteComponentProps, withRouter } from 'react-router';

type Props = PahinaCase & RouteComponentProps;

const CaseListItem = (props: Props) => {
  const { title, code, date, link } = props;
  // const { id, title, code, link, date } = props;

  const CreateButton = (
    <Button
      outline
      color="success"
      onClick={() => {
        // `/editor/?caseId=${id}`
        alert('Not yet implemented');
      }}
    >
      Create note
    </Button>
  );

  const ReviewButton = (
    <Button outline color="info" onClick={() => alert('Not yet implemented')}>
      Review case
    </Button>
  );

  return (
    <ListGroupItem className="">
      <ListGroupItemHeading className="row justify-content-between align-items-md-start">
        <NavLink
          target="_blank"
          href={link || ''}
          className="col-md-9 col-sm-12 text-md-left text-center"
        >
          <span>{`${code} | `}</span>
          <span>{date}</span>
        </NavLink>
        <div className="row col-sm-12 col-md-3 justify-content-md-end">
          <ButtonGroup className="" size="sm">
            {CreateButton}
            {ReviewButton}
          </ButtonGroup>
        </div>
      </ListGroupItemHeading>
      <ListGroupItemText>{title}</ListGroupItemText>
    </ListGroupItem>
  );
};

const RoutedCaseListItem = withRouter(CaseListItem);

export { RoutedCaseListItem as CaseListItem };
