import React, { useState } from 'react';
import { Subscribe } from 'unstated';
import {
  ListGroup,
  Input,
  InputGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupButtonDropdown,
} from 'reactstrap';

import './CasesScreen.css';
import './Screen.css';
import { PahinaCase } from '../shared';
import { CaseListItem, FetchMoreItem } from '../components/Lists';
import { CaseContainer, SystemContainer } from '../unstated';
import { ScrollButton } from '../components/Page';
import { CaseSearchField } from '../shared/actions/caseActions';

const CasesScreen: React.FC = () => {
  const [dropdownOpen, setDropDownOpen] = useState(false);

  return (
    <Subscribe to={[CaseContainer, SystemContainer]}>
      {(caseCntr: CaseContainer, system: SystemContainer) => {
        const { isFetchingMore } = caseCntr.state;
        const cases = caseCntr.data();
        const {
          setSearchText,
          setSearchField,
          fetchSearch,
          fetchMore,
        } = caseCntr;
        const { searchText, searchField } = caseCntr.state;
        const loadMore = async () => {
          await fetchMore();
        };
        const onSelectItem = (field: CaseSearchField) => {
          setSearchField(field);
          fetchSearch(searchText, field);
        };

        if (isFetchingMore) {
          const message = searchText
            ? `Searching "${searchText}" in "${searchField}" field`
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
              <InputGroupButtonDropdown
                addonType="prepend"
                isOpen={dropdownOpen}
                toggle={() => setDropDownOpen(!dropdownOpen)}
              >
                <DropdownToggle caret>Search {searchField}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => onSelectItem('code')}>
                    Code
                  </DropdownItem>
                  <DropdownItem onClick={() => onSelectItem('title')}>
                    Title
                  </DropdownItem>
                  <DropdownItem onClick={() => onSelectItem('date')}>
                    Date
                  </DropdownItem>
                </DropdownMenu>
              </InputGroupButtonDropdown>
              <Input
                onChange={e => {
                  setSearchText(e.target.value);
                  fetchSearch(e.target.value, searchField);
                }}
                type="search"
                name="search"
                id="Case-searchinput"
                placeholder="Use me!"
                value={searchText || ''}
              />
              {/* <InputGroupAddon addonType="append">
                <Button
                  outline
                  color="primary"
                  onClick={() => {
                    caseCntr.fetchSearch(searchText, searchField);
                  }}
                >
                  Sort
                </Button>
              </InputGroupAddon> */}
            </InputGroup>
            <ListGroup className="Margin-bottom-lg ">
              {cases.map((n: PahinaCase | null, i: number) => {
                if (!n) {
                  return null;
                }
                return <CaseListItem {...n} key={n.id} i={i + 1} showRowNum />;
              })}
              {caseCntr.hasNext() && (
                <FetchMoreItem loading={isFetchingMore} loadMore={loadMore} />
              )}
            </ListGroup>
            <ScrollButton scrollStepInPx={3000} delayInMs={16.66} />
          </div>
        );
      }}
    </Subscribe>
  );
};

export { CasesScreen };
