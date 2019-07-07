import _ from 'lodash';
import { Container } from 'unstated';
import { AppSyncUser, AppSyncUserNote } from '../shared/types';
import { handleGetCurrentUser, handleGetAppSyncUser } from '../shared';

export interface UserState {
  user?: AppSyncUser;
  notes: { [k: string]: AppSyncUserNote };
  isReady: boolean;
  isFetchingMore: boolean;
  errorMessage?: string | null;
}

const initialState = {
  user: undefined,
  isReady: false,
  isFetchingMore: false,
  notes: {},
};

class UserContainer extends Container<UserState> {
  state: UserState = initialState;

  constructor() {
    super();
    this.fetchAppUser();
  }

  public fetchAppUser = async (nextToken?: string) => {
    try {
      const cognitoUser = await handleGetCurrentUser();
      const user = await handleGetAppSyncUser(
        cognitoUser.getUsername(),
        nextToken,
      );
      if (user && user.getPahinaUser) {
        this.onSignIn(user.getPahinaUser);
      }
    } catch (err) {
      this.setState({ errorMessage: 'Failed to load user' });
    } finally {
      this.setState({ isReady: true });
    }
  };

  public fetchMoreNotes = async (nextToken: string) => {
    try {
      this.setState({ isFetchingMore: true });
      await this.fetchAppUser(nextToken);
    } finally {
      this.setState({ isFetchingMore: false });
    }
  };

  public onSignIn = (user: AppSyncUser) => {
    const { notes } = user;
    if (notes && notes.items) {
      const newNotes = _.keyBy(notes.items, 'id');
      this.setState(
        prev => ({ user, notes: { ...prev.notes, ...newNotes } } as UserState),
      );
    } else {
      this.setState({ user });
    }
  };

  public notes = () => {
    const { notes } = this.state;
    if (_.isEmpty(notes)) {
      return null;
    }
    return Object.values(notes);
  };
}

export { UserContainer };
