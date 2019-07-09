import { Container } from 'unstated';

export interface SystemState {
  errorMessage: string | null;
  successMessage: string | null;
  loadingMessage: string | null;
}

const initialState = {
  errorMessage: null,
  successMessage: null,
  loadingMessage: null,
};

class SystemContainer extends Container<SystemState> {
  constructor() {
    super();
    this.state = initialState;
  }

  public setSuccessMessage = (message?: string | null) => {
    this.setState({ successMessage: message });
  };

  public setErrorMessage = (message?: string | null) => {
    this.setState({ errorMessage: message });
  };

  public setLoadingMessage = (message?: string | null) => {
    this.setState({ loadingMessage: message });
  };
}

export { SystemContainer };
