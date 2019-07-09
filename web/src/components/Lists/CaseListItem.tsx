import React from 'react';

import {
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
  const { id, title, code, date, link } = props;

  const path = `/editor/?caseId=${id}&caseTitle=${title}&caseDate=${Date}&caseCode=${code}&caseLink=${link}`;
  const CreateButton = (
    <a className="btn btn-outline-primary" href={path}>
      Create note
    </a>
  );

  const ReviewButton = (
    <a className="btn btn-outline-secondary" href={link || '#'}>
      Review case
    </a>
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
