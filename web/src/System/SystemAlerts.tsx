import React from 'react';
import { Subscribe } from 'unstated';
import { Alert } from 'reactstrap';
import { SystemContainer } from '../unstated';

export const SystemAlerts = () => {
  return (
    <Subscribe to={[SystemContainer]}>
      {(system: SystemContainer) => {
        if (!system) {
          return null;
        }
        const { successMessage, errorMessage } = system.state;
        const { setSuccessMessage, setErrorMessage } = system;
        return (
          <div>
            <Alert
              color="success"
              isOpen={!!successMessage}
              toggle={() => setSuccessMessage(null)}
              className="pad-big"
            >
              {successMessage}
            </Alert>
            <Alert
              color="warning"
              isOpen={!!errorMessage}
              toggle={() => setErrorMessage(null)}
              className="pad-big"
            >
              {errorMessage}
            </Alert>
          </div>
        );
      }}
    </Subscribe>
  );
};
