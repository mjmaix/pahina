import React from 'react';
import { Subscribe } from 'unstated';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';

import Icon from 'react-icons-kit';
import { chevronsDown } from 'react-icons-kit/feather/chevronsDown';

import './CasesScreen.css';
import './Screen.css';
import { PahinaCase } from '../shared';
import { CaseListItem } from '../components/Lists';
import { IconSize } from '../themes/constants';
import { CaseContainer } from '../unstated';

const MoreComponent = (isFetchingMore: boolean) => {
  return isFetchingMore ? (
    <Spinner />
  ) : (
    <Icon size={IconSize.MD} icon={chevronsDown} />
  );
};

const CasesScreen: React.FC = () => (
  <Subscribe to={[CaseContainer]}>
    {(caseCntr: CaseContainer) => {
      const { isFetchingMore, nextToken } = caseCntr.state;
      const cases = caseCntr.data();
      const { fetchMore } = caseCntr;
      if (!cases) {
        return null;
      }
      // TODO: candidate for reuse with feching
      return (
        <div>
          <h3 className="Pad-lg text-center">Discover cases</h3>
          <div className="container">
            <ListGroup className="Margin-bottom-lg ">
              {cases.map((n: PahinaCase | null) => {
                if (!n) {
                  return null;
                }
                return <CaseListItem {...n} key={n.id} />;
              })}
              {!!nextToken && (
                <ListGroupItem
                  className="text-center"
                  onMouseEnter={async () => {
                    await fetchMore();
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

export { CasesScreen };
