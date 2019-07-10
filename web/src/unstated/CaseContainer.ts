import _ from 'lodash';
import { Container } from 'unstated';
import { PahinaCase, ListPahinaCasesQuery } from '../shared';
import {
  handleListAppSyncCase,
  CaseSearchField,
} from '../shared/actions/caseActions';

export interface CaseState {
  cases: { [k: string]: PahinaCase };
  isReady: boolean;
  isFetchingMore: boolean;
  hasNext: boolean;
  errorMessage?: string | null;
  nextToken: string | null;
  searchText?: string | null;
  searchField: CaseSearchField;
}
type ListResult = NonNullable<ListPahinaCasesQuery['listPahinaCases']>;

const initialState = {
  isReady: false,
  isFetchingMore: false,
  cases: {},
  nextToken: null,
  searchText: null,
  searchField: 'code' as CaseSearchField,
  hasNext: true,
};

class CaseContainer extends Container<CaseState> {
  state: CaseState = initialState;

  constructor() {
    super();
    this.fetchData();
  }

  public setSearchText = (searchText?: string | null) => {
    this.setState({ searchText, nextToken: null, cases: {} });
  };

  public setSearchField = (searchField?: CaseSearchField) => {
    this.setState({ searchField, nextToken: null, cases: {} });
  };

  public fetchData = async (
    nextToken?: string | null,
    searchText?: string | null,
    searchField?: CaseSearchField,
  ) => {
    try {
      const data = await handleListAppSyncCase(nextToken, {
        text: searchText,
        field: searchField,
      });
      if (data && data.listPahinaCases) {
        this.onFetch(data.listPahinaCases);
      }
    } catch (err) {
      this.setState({ errorMessage: 'Failed to load cases' });
    } finally {
      this.setState({ isReady: true });
    }
  };

  public fetchSearch = _.debounce(
    async (searchText?: string | null, searchField?: CaseSearchField) => {
      try {
        this.setState({ isFetchingMore: true });
        await this.fetchData(null, searchText, searchField);
      } finally {
        _.delay(() => {
          this.setState({ isFetchingMore: false });
        }, 1000);
      }
    },
    1 * 1000,
    {
      trailing: true,
      maxWait: 3 * 1000,
    },
  );

  public fetchMore = async () => {
    try {
      const { nextToken, searchField, searchText } = this.state;
      this.setState({ isFetchingMore: true });
      await this.fetchData(nextToken, searchText, searchField);
    } finally {
      _.delay(() => {
        this.setState({ isFetchingMore: false });
      }, 1000);
    }
  };

  public onFetch = ({ items, nextToken }: ListResult, reset = false) => {
    let data = {};
    if (items) {
      const newData = _.keyBy(items, 'id');
      data = { ...data, ...newData };
    }
    this.setState(prev => {
      const tokenChanged = prev.nextToken !== nextToken;
      const hasNext = tokenChanged;
      if (reset) {
        return { cases: { ...data }, nextToken, hasNext } as CaseState;
      }
      return {
        cases: { ...prev.cases, ...data },
        nextToken,
        hasNext,
      } as CaseState;
    });
  };

  public data = () => {
    const { cases } = this.state;
    if (_.isEmpty(cases)) {
      return [];
    }
    return Object.values(cases);
  };

  public hasNext = () => {
    return this.state.hasNext;
  };
}

export { CaseContainer };
