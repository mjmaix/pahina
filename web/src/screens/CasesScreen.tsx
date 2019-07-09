import React from 'react';
import { Subscribe } from 'unstated';
import { ListGroup, Input, InputGroupAddon, InputGroup } from 'reactstrap';

import './CasesScreen.css';
import './Screen.css';
import { PahinaCase } from '../shared';
import { CaseListItem, FetchMoreItem } from '../components/Lists';
import { CaseContainer, SystemContainer } from '../unstated';

const CasesScreen: React.FC = () => (
  <Subscribe to={[CaseContainer, SystemContainer]}>
    {(caseCntr: CaseContainer, system: SystemContainer) => {
      const { isFetchingMore } = caseCntr.state;
      const cases = caseCntr.data();
      const { fetchMore } = caseCntr;
      const loadMore = async () => {
        await fetchMore();
      };

      if (isFetchingMore) {
        const { search } = caseCntr.state;
        const message = search
          ? `Searching for "${search}"`
          : 'Retrieving list';
        if (message !== system.state.loadingMessage) {
          system.setLoadingMessage(message);
        }
      } else {
        const message = null;
        if (message !== system.state.loadingMessage) {
          system.setLoadingMessage(null);
        }
      }

      return (
        <div className="container">
          <h3 className="Pad-lg text-center">Discover cases</h3>
          <InputGroup className="Margin-bottom-lg">
            <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
            <Input
              onChange={e => {
                caseCntr.setSearch(e.target.value);
                caseCntr.fetchSearch(e.target.value);
              }}
              type="search"
              name="search"
              id="Case-searchinput"
              placeholder="Use me!"
              value={caseCntr.state.search || ''}
            />
          </InputGroup>
          <ListGroup className="Margin-bottom-lg ">
            {cases.map((n: PahinaCase | null) => {
              if (!n) {
                return null;
              }
              return <CaseListItem {...n} key={n.id} />;
            })}
            {caseCntr.hasNext() && (
              <FetchMoreItem loading={isFetchingMore} loadMore={loadMore} />
            )}
          </ListGroup>
        </div>
      );
    }}
  </Subscribe>
);

export { CasesScreen };
