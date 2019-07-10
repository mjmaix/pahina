import React from 'react';
import { Subscribe } from 'unstated';
import { Alert, Spinner } from 'reactstrap';
import { SystemContainer } from '../unstated';

export const SystemAlerts = () => {
  return (
    <Subscribe to={[SystemContainer]}>
      {(system: SystemContainer) => {
        if (!system) {
          return null;
        }
        const { successMessage, errorMessage, loadingMessage } = system.state;
        const { setSuccessMessage, setErrorMessage } = system;
        return (
          <div className="container">
            <Alert
              color="success"
              isOpen={!!successMessage}
              toggle={() => setSuccessMessage(null)}
              className="Margin-top-lg "
            >
              {successMessage}
            </Alert>
            <Alert
              color="warning"
              isOpen={!!errorMessage}
              toggle={() => setErrorMessage(null)}
              className="Margin-top-lg "
            >
              {errorMessage}
            </Alert>
            <Alert
              color="dark"
              isOpen={!!loadingMessage}
              className="d-flex align-items-center Margin-top-lg"
              fade={true}
            >
              <Spinner />
              <span>&nbsp;{loadingMessage}</span>
            </Alert>
          </div>
        );
      }}
    </Subscribe>
  );
};
