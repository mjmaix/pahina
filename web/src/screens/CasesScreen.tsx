import React from 'react';
import { Subscribe } from 'unstated';
import { ListGroup } from 'reactstrap';

import './CasesScreen.css';
import './Screen.css';
import { PahinaCase } from '../shared';
import { CaseListItem, FetchMoreItem } from '../components/Lists';
import { CaseContainer } from '../unstated';

const CasesScreen: React.FC = () => (
  <Subscribe to={[CaseContainer]}>
    {(caseCntr: CaseContainer) => {
      const { isFetchingMore, nextToken } = caseCntr.state;
      const cases = caseCntr.data();
      const { fetchMore } = caseCntr;
      const loadMore = async () => {
        await fetchMore();
      };
      if (!cases) {
        return null;
      }
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
                <FetchMoreItem loading={isFetchingMore} loadMore={loadMore} />
              )}
            </ListGroup>
          </div>
        </div>
      );
    }}
  </Subscribe>
);

export { CasesScreen };
