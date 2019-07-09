import _ from 'lodash';
import { Container } from 'unstated';
import { PahinaCase, ListPahinaCasesQuery } from '../shared';
import { handleListAppSyncCase } from '../shared/actions/caseActions';

export interface CaseState {
  cases: { [k: string]: PahinaCase };
  isReady: boolean;
  isFetchingMore: boolean;
  hasNext: boolean;
  errorMessage?: string | null;
  nextToken: string | null;
  search?: string | null;
}
type ListResult = NonNullable<ListPahinaCasesQuery['listPahinaCases']>;

const initialState = {
  isReady: false,
  isFetchingMore: false,
  cases: {},
  nextToken: null,
  search: null,
  hasNext: true,
};

class CaseContainer extends Container<CaseState> {
  state: CaseState = initialState;

  constructor() {
    super();
    this.fetchData();
  }

  public setSearch = (text?: string | null) => {
    this.setState({
      search: text,
      nextToken: null,
      cases: {},
    });
  };

  public fetchData = async (
    nextToken?: string | null,
    search?: string | null,
  ) => {
    try {
      const data = await handleListAppSyncCase(nextToken, search);
      if (data && data.listPahinaCases) {
        this.onFetch(data.listPahinaCases, !!search);
      }
    } catch (err) {
      this.setState({ errorMessage: 'Failed to load cases' });
    } finally {
      this.setState({ isReady: true });
    }
  };

  public fetchSearch = _.debounce(
    async (text?: string | null) => {
      try {
        this.setState({ isFetchingMore: true });
        await this.fetchData(null, text);
      } finally {
        _.delay(() => {
          this.setState({ isFetchingMore: false });
        }, 1000);
      }
    },
    1 * 1000,
    {
      leading: true,
      maxWait: 3 * 1000,
    },
  );

  public fetchMore = async () => {
    try {
      const { nextToken, search } = this.state;
      this.setState({ isFetchingMore: true });
      await this.fetchData(nextToken, search);
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
