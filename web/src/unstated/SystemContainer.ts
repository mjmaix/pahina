import { Container } from 'unstated';

export interface SystemState {
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState = {
  errorMessage: null,
  successMessage: null,
};

class SystemContainer extends Container<SystemState> {
  constructor() {
    super();
    this.state = initialState;
  }

  public setSuccessMessage = (message: string | null) => {
    this.setState({ successMessage: message });
  };

  public setErrorMessage = (message: string | null) => {
    this.setState({ errorMessage: message });
  };
}

export { SystemContainer };
