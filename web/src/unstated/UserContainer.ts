import { Container } from 'unstated';
import { AppSyncUser } from '../shared/types';
import { handleGetCurrentUser, handleGetAppSyncUser } from '../shared';

export interface UserState {
  user?: AppSyncUser;
  isReady: boolean;
  errorMessage?: string | null;
}

const initialState = {
  user: undefined,
  isReady: false,
};

class UserContainer extends Container<UserState> {
  state: UserState = initialState;

  constructor() {
    super();
    this.fetchAppUser();
  }

  private async fetchAppUser() {
    try {
      const cognitoUser = await handleGetCurrentUser();
      const user = await handleGetAppSyncUser(cognitoUser.getUsername());
      if (user && user.getPahinaUser) {
        this.onSignIn(user.getPahinaUser);
      }
    } catch (err) {
      this.setState({ errorMessage: 'Failed to load user' });
    } finally {
      this.setState({ isReady: true });
    }
  }

  public onSignIn(user: AppSyncUser) {
    this.setState({ user });
  }

  public notes() {
    if (!this.state.user) {
      return null;
    }
    return this.state.user.notes;
  }
}

export { UserContainer };
