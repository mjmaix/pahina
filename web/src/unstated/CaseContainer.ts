import _ from 'lodash';
import { Container } from 'unstated';
import { PahinaCase, ListPahinaCasesQuery } from '../shared';
import { handleListAppSyncCase } from '../shared/actions/caseActions';

export interface CaseState {
  cases: { [k: string]: PahinaCase };
  isReady: boolean;
  isFetchingMore: boolean;
  errorMessage?: string | null;
  nextToken: string | null;
}
type ListResult = NonNullable<ListPahinaCasesQuery['listPahinaCases']>;

const initialState = {
  isReady: false,
  isFetchingMore: false,
  cases: {},
  nextToken: null,
};

class CaseContainer extends Container<CaseState> {
  state: CaseState = initialState;

  constructor() {
    super();
    this.fetchData();
  }

  public fetchData = async (nextToken?: string | null) => {
    try {
      const data = await handleListAppSyncCase(nextToken);
      if (data && data.listPahinaCases) {
        this.onFetch(data.listPahinaCases);
      }
    } catch (err) {
      this.setState({ errorMessage: 'Failed to load cases' });
    } finally {
      this.setState({ isReady: true });
    }
  };

  public fetchMore = async () => {
    try {
      const { nextToken } = this.state;
      this.setState({ isFetchingMore: true });
      await this.fetchData(nextToken);
    } finally {
      this.setState({ isFetchingMore: false });
    }
  };

  public onFetch = ({ items, nextToken }: ListResult) => {
    let data = {};
    if (items) {
      const newData = _.keyBy(items, 'id');
      data = { ...data, ...newData };
    }
    this.setState(
      prev => ({ cases: { ...prev.cases, ...data }, nextToken } as CaseState),
    );
  };

  public data = () => {
    const { cases } = this.state;
    if (_.isEmpty(cases)) {
      return null;
    }
    return Object.values(cases);
  };
}

export { CaseContainer };
